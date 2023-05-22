package com.example.demo.controllers;
import com.example.demo.Entities.Message;
import com.example.demo.Entities.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;

import jakarta.validation.Valid;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.*;
import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class MessageController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/messages")
    void createMessage(@Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String messageBlock = jsonNode.get("messageBlock").asText();
        int senderId = jsonNode.get("senderId").asInt();
        int receiverId = jsonNode.get("receiverId").asInt();

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO message (message_block) VALUES (?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, messageBlock);
            return ps;
        }, keyHolder);

        Map<String, Object> keys = keyHolder.getKeys();
        int messageId = (int) keys.get("id");


        jdbcTemplate.update(
                "INSERT INTO user_message (sender_id, receiver_id, message_id) VALUES (?, ?, ?)",
                senderId,
                receiverId,
                messageId
        );
    }

    @PutMapping("/messages/{id}")
    void updateMessage(@PathVariable int id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String messageBlock = jsonNode.get("messageBlock").asText();

        jdbcTemplate.update(
                "UPDATE message SET message_block = ? WHERE id = ?",
                messageBlock,
                id
        );
    }

    @GetMapping("/messages/users/{userId}")
    Collection<User> getUsersWithMessages(@PathVariable int userId) {
        String sql = "SELECT DISTINCT u.* " +
                "FROM \"user\" u " +
                "JOIN message_user_view mu ON u.user_id = mu.sender_id OR u.user_id = mu.receiver_id " +
                "WHERE mu.sender_id = ? OR mu.receiver_id = ?";
        Object[] params = { userId, userId };

        List<User> users = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    User user = new User();
                    user.setUserId(rs.getInt("user_id"));
                    user.setName(rs.getString("name"));
                    user.setSurname(rs.getString("surname"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setDateOfBirth(rs.getDate("date_of_birth"));
                    user.setPhoneNumber(rs.getString("phone_number"));
                    user.setBalance(rs.getBigDecimal("balance"));
                    user.setAddress(rs.getString("address"));
                    user.setRole(rs.getString("role"));
                    user.setUpdatedAt(rs.getTimestamp("updated_at"));
                    user.setCreatedAt(rs.getTimestamp("created_at"));
                    return user;
                }
        );

        for (User user : users) {
            System.out.println(user.getName());
        }

        return users;
    }

    @GetMapping("/messages/{senderId}/{receiverId}")
    Collection<Message> getMessagesByUsers(@PathVariable int senderId, @PathVariable int receiverId) {
        String sql = "SELECT * FROM message_user_view WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
        Object[] params = {senderId, receiverId, receiverId, senderId};

        List<Message> messages = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Message message = new Message();
                    message.setId(rs.getInt("message_id"));
                    message.setMessageBlock(rs.getString("message_block"));
                    message.setTimestamp(rs.getTimestamp("timestamp"));
                    message.setSenderID(rs.getInt("sender_id"));
                    message.setReceiverID(rs.getInt("receiver_id"));
                    return message;
                }
        );

        for (Message message : messages) {
            System.out.println("Message ID: " + message.getId());
            System.out.println("Message Block: " + message.getMessageBlock());
            System.out.println("Timestamp: " + message.getTimestamp());
            System.out.println("Sender ID: " + message.getSenderID());
            System.out.println("Receiver ID: " + message.getReceiverID());
        }

        return messages;
    }



}
