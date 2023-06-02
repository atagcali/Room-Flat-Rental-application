package com.example.demo.controllers;

import com.example.demo.Entities.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;

import jakarta.validation.Valid;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.sql.SQLException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class UserController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/users")
    Collection<User> users() {
        List<User> users = jdbcTemplate.query(
                "SELECT * FROM \"user\"",
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

    @GetMapping("/user/{id}")
    User getUser(@PathVariable Long id) {
        String sql = "SELECT * FROM \"user\" WHERE user_id = ?";
        Object[] params = {id};

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

        if (users.isEmpty()) {
            throw new NoSuchElementException("User not found with ID: " + id);
        }
        System.out.println(users.get(0).getName());
        return users.get(0);
    }

    @GetMapping("/user/login")
    User login(@RequestParam String email, @RequestParam String password) {
        String sql = "SELECT * FROM \"user\" WHERE email = ? AND password = ?";
        Object[] params = {email, password};
        System.out.println(email);
        System.out.println(password);
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

        if (users.isEmpty()) {
            throw new NoSuchElementException("User not found with the provided email and password");
        }
        System.out.println(users.get(0).getName());

        return users.get(0);
    }



    @PostMapping("/user")
    void createUser(@Valid @RequestBody String jsonPayload) throws JsonProcessingException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String name = jsonNode.get("name").asText();
        String surname = jsonNode.get("surname").asText();
        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        BigDecimal balance = jsonNode.get("balance").decimalValue();
        String address = jsonNode.get("address").asText();
        String role = jsonNode.get("role").asText();

        String dateOfBirthStr = jsonNode.get("dateOfBirth").asText();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date dateOfBirth = null;

        try {
            dateOfBirth = dateFormat.parse(dateOfBirthStr);
        } catch (ParseException e) {
            // Handle the parse exception if the date format is invalid
            e.printStackTrace();
        }

        // Perform further operations with the User object
        System.out.println("Name: " + name);
        System.out.println("Surname: " + surname);
        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
        System.out.println("Phone Number: " + phoneNumber);
        System.out.println("Balance: " + balance);
        System.out.println("Address: " + address);
        System.out.println("Role: " + role);
        System.out.println("Date: " + dateOfBirth.toString());

        jdbcTemplate.update(
                "INSERT INTO \"user\" (name , surname, email, password, phone_number , balance , address , role , date_of_birth ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
                name,
                surname,
                email,
                password,
                phoneNumber,
                balance,
                address,
                role,
                new java.sql.Date(dateOfBirth.getTime())
        );
    }

    @PutMapping("/user/{id}")
    void updateUser(@PathVariable Long id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String name = jsonNode.get("name").asText();
        String surname = jsonNode.get("surname").asText();
        String email = jsonNode.get("email").asText();
        String password = jsonNode.get("password").asText();
        String phoneNumber = jsonNode.get("phoneNumber").asText();
        BigDecimal balance = jsonNode.get("balance").decimalValue();
        String address = jsonNode.get("address").asText();
        String role = jsonNode.get("role").asText();

        //Date dateOfBirth = null;
        //if(jsonNode.get("dateOfBirth")!=null) {
        //    String dateOfBirthStr = jsonNode.get("dateOfBirth").asText();
        //    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
//
        //    try {
        //        dateOfBirth = dateFormat.parse(dateOfBirthStr);
        //    } catch (ParseException e) {
        //        // Handle the parse exception if the date format is invalid
        //        e.printStackTrace();
        //    }
        //}
        //else {
//
        //}

        // Perform further operations with the updated user information
        System.out.println("Updated User ID: " + id);
        System.out.println("Name: " + name);
        System.out.println("Surname: " + surname);
        System.out.println("Email: " + email);
        System.out.println("Password: " + password);
        System.out.println("Phone Number: " + phoneNumber);
        System.out.println("Balance: " + balance);
        System.out.println("Address: " + address);
        System.out.println("Role: " + role);
        //System.out.println("Date: " + dateOfBirth.toString());

        jdbcTemplate.update(
                "UPDATE \"user\" SET name = ?, surname = ?, email = ?, password = ?, phone_number = ?, balance = ?, address = ?, role = ? /*date_of_birth = ?*/ WHERE user_id = ?",
                name,
                surname,
                email,
                password,
                phoneNumber,
                balance,
                address,
                role,
                //new java.sql.Date(dateOfBirth.getTime()),
                id
        );
    }
}
