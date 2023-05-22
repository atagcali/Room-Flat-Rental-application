package com.example.demo.controllers;
import com.example.demo.Entities.Payment;
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
public class PaymentController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/payments")
    void createPayment(@Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String paymentMethod = jsonNode.get("paymentMethod").asText();
        BigDecimal amount = jsonNode.get("amount").decimalValue();
        String dateStr = jsonNode.get("date").asText();
        int homeownerId = jsonNode.get("homeownerId").asInt();
        int travellerId = jsonNode.get("travellerId").asInt();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;

        try {
            date = dateFormat.parse(dateStr);
        } catch (ParseException e) {
            // Handle the parse exception if the date format is invalid
            e.printStackTrace();
        }

        // Perform further operations with the Payment object
        System.out.println("Payment Method: " + paymentMethod);
        System.out.println("Amount: " + amount);
        System.out.println("Date: " + date.toString());
        System.out.println("Homeowner ID: " + homeownerId);
        System.out.println("Traveller ID: " + travellerId);

        jdbcTemplate.update(
                "INSERT INTO payment (payment_method, amount, date, homeowner_id, traveller_id) VALUES (?, ?, ?, ?, ?)",
                paymentMethod,
                amount,
                new java.sql.Date(date.getTime()),
                homeownerId,
                travellerId
        );
    }

    @PutMapping("/payments/{id}")
    void updatePayment(@PathVariable int id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String paymentMethod = jsonNode.get("paymentMethod").asText();
        BigDecimal amount = jsonNode.get("amount").decimalValue();
        String dateStr = jsonNode.get("date").asText();
        int homeownerId = jsonNode.get("homeownerId").asInt();
        int travellerId = jsonNode.get("travellerId").asInt();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;

        try {
            date = dateFormat.parse(dateStr);
        } catch (ParseException e) {
            // Handle the parse exception if the date format is invalid
            e.printStackTrace();
        }

        // Perform further operations with the updated Payment object
        System.out.println("Updated Payment ID: " + id);
        System.out.println("Payment Method: " + paymentMethod);
        System.out.println("Amount: " + amount);
        System.out.println("Date: " + date.toString());
        System.out.println("Homeowner ID: " + homeownerId);
        System.out.println("Traveller ID: " + travellerId);

        jdbcTemplate.update(
                "UPDATE payment SET payment_method = ?, amount = ?, date = ?, homeowner_id = ?, traveller_id = ? WHERE id = ?",
                paymentMethod,
                amount,
                new java.sql.Date(date.getTime()),
                homeownerId,
                travellerId,
                id
        );
    }

    @GetMapping("/payments/{id}")
    Payment getPaymentById(@PathVariable int id) {
        String sql = "SELECT * FROM payment WHERE id = ?";
        Object[] params = { id };

        List<Payment> payments = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Payment payment = new Payment();
                    payment.setId(rs.getInt("id"));
                    payment.setPaymentMethod(rs.getString("payment_method"));
                    payment.setAmount(rs.getBigDecimal("amount"));
                    payment.setDate(rs.getDate("date"));
                    payment.setHomeownerId(rs.getInt("homeowner_id"));
                    payment.setTravellerId(rs.getInt("traveller_id"));
                    payment.setUpdatedAt(rs.getTimestamp("updated_at"));
                    payment.setCreatedAt(rs.getTimestamp("created_at"));
                    return payment;
                }
        );

        if (payments.isEmpty()) {
            throw new NoSuchElementException("Payment not found with ID: " + id);
        }

        System.out.println(payments.get(0).getId());
        return payments.get(0);
    }

    @GetMapping("/payments/homeowner/{homeownerId}")
    Collection<Payment> getPaymentsByHomeownerId(@PathVariable int homeownerId) {
        String sql = "SELECT * FROM payment WHERE homeowner_id = ?";
        Object[] params = { homeownerId };

        List<Payment> payments = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Payment payment = new Payment();
                    payment.setId(rs.getInt("id"));
                    payment.setPaymentMethod(rs.getString("payment_method"));
                    payment.setAmount(rs.getBigDecimal("amount"));
                    payment.setDate(rs.getDate("date"));
                    payment.setHomeownerId(rs.getInt("homeowner_id"));
                    payment.setTravellerId(rs.getInt("traveller_id"));
                    payment.setUpdatedAt(rs.getTimestamp("updated_at"));
                    payment.setCreatedAt(rs.getTimestamp("created_at"));
                    return payment;
                }
        );

        for (Payment payment : payments) {
            System.out.println(payment.getId());
        }

        return payments;
    }

    @GetMapping("/payments/traveller/{travellerId}")
    Collection<Payment> getPaymentsByTravellerId(@PathVariable int travellerId) {
        String sql = "SELECT * FROM payment WHERE traveller_id = ?";
        Object[] params = { travellerId };

        List<Payment> payments = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Payment payment = new Payment();
                    payment.setId(rs.getInt("id"));
                    payment.setPaymentMethod(rs.getString("payment_method"));
                    payment.setAmount(rs.getBigDecimal("amount"));
                    payment.setDate(rs.getDate("date"));
                    payment.setHomeownerId(rs.getInt("homeowner_id"));
                    payment.setTravellerId(rs.getInt("traveller_id"));
                    payment.setUpdatedAt(rs.getTimestamp("updated_at"));
                    payment.setCreatedAt(rs.getTimestamp("created_at"));
                    return payment;
                }
        );

        for (Payment payment : payments) {
            System.out.println(payment.getId());
        }

        return payments;
    }
}
