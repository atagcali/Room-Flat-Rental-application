package com.example.demo.controllers;

import com.example.demo.Entities.Booking;
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

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.SQLException;

@RestController
@RequestMapping("/api")
public class BookingController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/bookings")
    void createBooking(@Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        int travellerId = jsonNode.get("travellerId").asInt(); //Dont forget to add json

        int rentalPropertyId = jsonNode.get("rentalPropertyId").asInt();
        String checkinDateStr = jsonNode.get("checkinDate").asText();
        String checkoutDateStr = jsonNode.get("checkoutDate").asText();
        String status = jsonNode.get("status").asText();
        BigDecimal pricePaid = jsonNode.get("pricePaid").decimalValue();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinDate = null;
        Date checkoutDate = null;

        try {
            checkinDate = dateFormat.parse(checkinDateStr);
            checkoutDate = dateFormat.parse(checkoutDateStr);
        } catch (ParseException e) {
            // Handle the parse exception if the date format is invalid
            e.printStackTrace();
        }

        java.sql.Date checkInDate = new java.sql.Date(checkinDate.getTime());
        java.sql.Date checkOutDate = new java.sql.Date(checkoutDate.getTime());

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(
                    "INSERT INTO booking (rental_property_id, checkin_date, checkout_date, status, price_paid) VALUES (?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setInt(1, rentalPropertyId);
            ps.setDate(2, checkInDate);
            ps.setDate(3, checkOutDate);
            ps.setString(4, status);
            ps.setBigDecimal(5, pricePaid);
            return ps;
        }, keyHolder);

        // Retrieve the generated booking ID
        Map<String, Object> keys = keyHolder.getKeys();
        int bookingId = (int) keys.get("id");

        // Retrieve the homeowner ID from the rental_property_view
        String sql = "SELECT homeownerId FROM rental_property_view WHERE rental_property_id = ?";
        Object[] params = { rentalPropertyId };

        Integer homeownerId = jdbcTemplate.queryForObject(sql, params, Integer.class);
        if (homeownerId == null) {
            throw new NoSuchElementException("Homeowner not found for rental property ID: " + rentalPropertyId);
        }

        // Insert the relationship into the book_travel_homeowner table
        jdbcTemplate.update(
                "INSERT INTO book_travel_homeowner (homeowner_id, traveller_id, book_id) VALUES (?, ?, ?)",
                homeownerId,
                travellerId,
                bookingId
        );
    }

    @PutMapping("/bookings/{id}")
    void updateBooking(@PathVariable int id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String checkinDateStr = jsonNode.get("checkinDate").asText();
        String checkoutDateStr = jsonNode.get("checkoutDate").asText();
        String status = jsonNode.get("status").asText();
        BigDecimal pricePaid = jsonNode.get("pricePaid").decimalValue();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        Date checkinDate = null;
        Date checkoutDate = null;

        try {
            checkinDate = dateFormat.parse(checkinDateStr);
            checkoutDate = dateFormat.parse(checkoutDateStr);
        } catch (ParseException e) {
            // Handle the parse exception if the date format is invalid
            e.printStackTrace();
        }

        jdbcTemplate.update(
                "UPDATE booking SET checkin_date = ?, checkout_date = ?, status = ?, price_paid = ? WHERE id = ?",
                new java.sql.Date(checkinDate.getTime()),
                new java.sql.Date(checkoutDate.getTime()),
                status,
                pricePaid,
                id
        );
    }

    @PutMapping("/bookings/{id}/cancel")
    void cancelBooking(@PathVariable int id) throws SQLException {
        Timestamp cancellationTime = new Timestamp(System.currentTimeMillis());

        jdbcTemplate.update(
                "UPDATE booking SET status = 'canceled', cancelled_at = ? WHERE id = ?",
                cancellationTime,
                id
        );
    }

    @GetMapping("/bookings")
    Collection<Booking> getAllBookings() {
        List<Booking> bookings = jdbcTemplate.query(
                "SELECT * FROM booking_join_view",
                (rs, rowNum) -> {
                    Booking booking = new Booking();
                    booking.setId(rs.getInt("booking_id"));
                    booking.setRentalPropertyId(rs.getInt("rental_property_id"));
                    booking.setCheckinDate(rs.getDate("checkin_date"));
                    booking.setCheckoutDate(rs.getDate("checkout_date"));
                    booking.setStatus(rs.getString("status"));
                    booking.setPricePaid(rs.getBigDecimal("price_paid"));
                    booking.setHomeownerId(rs.getInt("homeowner_id"));
                    booking.setTravellerId(rs.getInt("traveller_id"));
                    return booking;
                }
        );

        for (Booking booking : bookings) {
            System.out.println(booking.getId());
        }

        return bookings;
    }

    @GetMapping("/bookings/traveller/{travellerId}")
    Collection<Booking> getBookingsByTravellerId(@PathVariable int travellerId) {
        String sql = "SELECT * FROM booking_join_view WHERE traveller_id = ?";
        Object[] params = { travellerId };

        List<Booking> bookings = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Booking booking = new Booking();
                    booking.setId(rs.getInt("booking_id"));
                    booking.setRentalPropertyId(rs.getInt("rental_property_id"));
                    booking.setCheckinDate(rs.getDate("checkin_date"));
                    booking.setCheckoutDate(rs.getDate("checkout_date"));
                    booking.setStatus(rs.getString("status"));
                    booking.setPricePaid(rs.getBigDecimal("price_paid"));
                    booking.setHomeownerId(rs.getInt("homeowner_id"));
                    booking.setTravellerId(rs.getInt("traveller_id"));
                    return booking;
                }
        );

        for (Booking booking : bookings) {
            System.out.println(booking.getId());
        }

        return bookings;
    }

    @GetMapping("/bookings/homeowner/{homeownerId}")
    Collection<Booking> getBookingsByHomeownerId(@PathVariable int homeownerId) {
        String sql = "SELECT * FROM booking_join_view WHERE homeowner_id = ?";
        Object[] params = { homeownerId };

        List<Booking> bookings = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Booking booking = new Booking();
                    booking.setId(rs.getInt("booking_id"));
                    booking.setRentalPropertyId(rs.getInt("rental_property_id"));
                    booking.setCheckinDate(rs.getDate("checkin_date"));
                    booking.setCheckoutDate(rs.getDate("checkout_date"));
                    booking.setStatus(rs.getString("status"));
                    booking.setPricePaid(rs.getBigDecimal("price_paid"));
                    booking.setHomeownerId(rs.getInt("homeowner_id"));
                    booking.setTravellerId(rs.getInt("traveller_id"));
                    return booking;
                }
        );

        for (Booking booking : bookings) {
            System.out.println(booking.getId());
        }

        return bookings;
    }
    @GetMapping("/bookings/{id}")
    Booking getBookingById(@PathVariable int id) {
        String sql = "SELECT * FROM booking_join_view WHERE booking_id = ?";
        Object[] params = { id };

        List<Booking> bookings = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Booking booking = new Booking();
                    booking.setId(rs.getInt("booking_id"));
                    booking.setRentalPropertyId(rs.getInt("rental_property_id"));
                    booking.setCheckinDate(rs.getDate("checkin_date"));
                    booking.setCheckoutDate(rs.getDate("checkout_date"));
                    booking.setStatus(rs.getString("status"));
                    booking.setPricePaid(rs.getBigDecimal("price_paid"));
                    booking.setHomeownerId(rs.getInt("homeowner_id"));
                    booking.setTravellerId(rs.getInt("traveller_id"));
                    return booking;
                }
        );

        if (bookings.isEmpty()) {
            throw new NoSuchElementException("Booking not found with ID: " + id);
        }

        System.out.println(bookings.get(0).getId());
        return bookings.get(0);
    }
}
