package com.example.demo.controllers;

import com.example.demo.Entities.RentalProperty;
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
import java.util.Collection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class RentalPropertyController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/rental-property")
    void createRentalProperty(@Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        int locationId = jsonNode.get("locationId").asInt(); // do not forget it

        String title = jsonNode.get("title").asText();
        String description = jsonNode.get("description").asText();
        String availabilityCalendar = jsonNode.get("availabilityCalendar").asText();
        BigDecimal price = jsonNode.get("price").decimalValue();
        int maxGuests = jsonNode.get("maxGuests").asInt();
        String rules = jsonNode.get("rules").asText();
        String photos = jsonNode.get("photos").asText();
        int minStay = jsonNode.get("minStay").asInt();
        int maxStay = jsonNode.get("maxStay").asInt();
        String cancellationPolicy = jsonNode.get("cancellationPolicy").asText();
        BigDecimal rating = jsonNode.get("rating").decimalValue();
        boolean isAvailableInEmergency = jsonNode.get("isAvailableInEmergency").asBoolean();
        boolean isPetFriendly = jsonNode.get("isPetFriendly").asBoolean();
        boolean hasParking = jsonNode.get("hasParking").asBoolean();
        boolean hasBalcony = jsonNode.get("hasBalcony").asBoolean();
        boolean hasPool = jsonNode.get("hasPool").asBoolean();
        int userId = jsonNode.get("userId").asInt(); // Assuming you have the user ID associated with the rental property

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO rental_property (title, description, availability_calendar, price, max_guests, " +
                            "rules, photos, min_stay, max_stay, cancellation_policy, rating, is_available_in_emergency, is_pet_friendly, " +
                            "has_parking, has_balcony, has_pool, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS
            );
            ps.setString(1, title);
            ps.setString(2, description);
            ps.setString(3, availabilityCalendar);
            ps.setBigDecimal(4, price);
            ps.setInt(5, maxGuests);
            ps.setString(6, rules);
            ps.setString(7, photos);
            ps.setInt(8, minStay);
            ps.setInt(9, maxStay);
            ps.setString(10, cancellationPolicy);
            ps.setBigDecimal(11,rating);
            ps.setBoolean(12,isAvailableInEmergency);
            ps.setBoolean(13,isPetFriendly);
            ps.setBoolean(14,hasParking);
            ps.setBoolean(15,hasBalcony);
            ps.setBoolean(16,hasPool);
            ps.setInt(17, userId);
            return ps;
        }, keyHolder);

        Map<String, Object> keys = keyHolder.getKeys();
        int propId = (int) keys.get("id");

        jdbcTemplate.update("INSERT INTO located_in (rental_property_id, location_id) VALUES (?,?)", propId, locationId);
    }

    @PutMapping("/rental-property/{id}")
    void updateRentalProperty(@PathVariable Long id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String title = jsonNode.get("title").asText();
        String description = jsonNode.get("description").asText();
        String availabilityCalendar = jsonNode.get("availabilityCalendar").asText();
        BigDecimal price = jsonNode.get("price").decimalValue();
        int maxGuests = jsonNode.get("maxGuests").asInt();
        String rules = jsonNode.get("rules").asText();
        String photos = jsonNode.get("photos").asText();
        int minStay = jsonNode.get("minStay").asInt();
        int maxStay = jsonNode.get("maxStay").asInt();
        String cancellationPolicy = jsonNode.get("cancellationPolicy").asText();
        BigDecimal rating = jsonNode.get("rating").decimalValue();
        boolean isAvailableInEmergency = jsonNode.get("isAvailableInEmergency").asBoolean();
        boolean isPetFriendly = jsonNode.get("isPetFriendly").asBoolean();
        boolean hasParking = jsonNode.get("hasParking").asBoolean();
        boolean hasBalcony = jsonNode.get("hasBalcony").asBoolean();
        boolean hasPool = jsonNode.get("hasPool").asBoolean();

        jdbcTemplate.update(
                "UPDATE rental_property SET title = ?, description = ?, availability_calendar = ?, price = ?, max_guests = ?, rules = ?, photos = ?, min_stay = ?, max_stay = ?, cancellation_policy = ?, rating = ?, is_available_in_emergency = ?, is_pet_friendly = ?, has_parking = ?, has_balcony = ?, has_pool = ? WHERE id = ?",
                title,
                description,
                availabilityCalendar,
                price,
                maxGuests,
                rules,
                photos,
                minStay,
                maxStay,
                cancellationPolicy,
                rating,
                isAvailableInEmergency,
                isPetFriendly,
                hasParking,
                hasBalcony,
                hasPool,
                id
        );
    }

    @GetMapping("/rental-properties")
    Collection<RentalProperty> getRentalProperties() {
        List<RentalProperty> rentalProperties = jdbcTemplate.query(
                "SELECT * FROM rental_property_located_view",
                (rs, rowNum) -> {
                    RentalProperty rentalProperty = new RentalProperty();
                    rentalProperty.setId(rs.getInt("id"));
                    rentalProperty.setTitle(rs.getString("title"));
                    rentalProperty.setDescription(rs.getString("description"));
                    rentalProperty.setAvailabilityCalendar(rs.getString("availability_calendar"));
                    rentalProperty.setPrice(rs.getBigDecimal("price"));
                    rentalProperty.setMaxGuests(rs.getInt("max_guests"));
                    rentalProperty.setRules(rs.getString("rules"));
                    rentalProperty.setPhotos(rs.getString("photos"));
                    rentalProperty.setUpdatedAt(rs.getTimestamp("updated_at"));
                    rentalProperty.setCreatedAt(rs.getTimestamp("created_at"));
                    rentalProperty.setMinStay(rs.getInt("min_stay"));
                    rentalProperty.setMaxStay(rs.getInt("max_stay"));
                    rentalProperty.setCancellationPolicy(rs.getString("cancellation_policy"));
                    rentalProperty.setRating(rs.getBigDecimal("rating"));
                    rentalProperty.setAvailableInEmergency(rs.getBoolean("is_available_in_emergency"));
                    rentalProperty.setPetFriendly(rs.getBoolean("is_pet_friendly"));
                    rentalProperty.setHasParking(rs.getBoolean("has_parking"));
                    rentalProperty.setHasBalcony(rs.getBoolean("has_balcony"));
                    rentalProperty.setHasPool(rs.getBoolean("has_pool"));
                    rentalProperty.setUserId(rs.getInt("user_id"));
                    rentalProperty.setLocationID(rs.getInt("location_id"));
                    return rentalProperty;
                }
        );

        for (RentalProperty rentalProperty : rentalProperties) {
            System.out.println(rentalProperty.getTitle());
        }

        return rentalProperties;
    }


    @GetMapping("/rental-properties/{id}")
    RentalProperty getRentalPropertyById(@PathVariable int id) {
        String sql = "SELECT * FROM rental_property_located_view WHERE id = ?";
        Object[] params = { id };

        List<RentalProperty> rentalProperties = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    RentalProperty rentalProperty = new RentalProperty();
                    rentalProperty.setId(rs.getInt("id"));
                    rentalProperty.setTitle(rs.getString("title"));
                    rentalProperty.setDescription(rs.getString("description"));
                    rentalProperty.setAvailabilityCalendar(rs.getString("availability_calendar"));
                    rentalProperty.setPrice(rs.getBigDecimal("price"));
                    rentalProperty.setMaxGuests(rs.getInt("max_guests"));
                    rentalProperty.setRules(rs.getString("rules"));
                    rentalProperty.setPhotos(rs.getString("photos"));
                    rentalProperty.setUpdatedAt(rs.getTimestamp("updated_at"));
                    rentalProperty.setCreatedAt(rs.getTimestamp("created_at"));
                    rentalProperty.setMinStay(rs.getInt("min_stay"));
                    rentalProperty.setMaxStay(rs.getInt("max_stay"));
                    rentalProperty.setCancellationPolicy(rs.getString("cancellation_policy"));
                    rentalProperty.setRating(rs.getBigDecimal("rating"));
                    rentalProperty.setAvailableInEmergency(rs.getBoolean("is_available_in_emergency"));
                    rentalProperty.setPetFriendly(rs.getBoolean("is_pet_friendly"));
                    rentalProperty.setHasParking(rs.getBoolean("has_parking"));
                    rentalProperty.setHasBalcony(rs.getBoolean("has_balcony"));
                    rentalProperty.setHasPool(rs.getBoolean("has_pool"));
                    rentalProperty.setUserId(rs.getInt("user_id"));
                    rentalProperty.setLocationID(rs.getInt("location_id"));
                    return rentalProperty;
                }
        );

        if (rentalProperties.isEmpty()) {
            throw new NoSuchElementException("Rental property not found with ID: " + id);
        }

        System.out.println(rentalProperties.get(0).getTitle());
        return rentalProperties.get(0);
    }


    @GetMapping("/rental-properties/user/{userId}")
    Collection<RentalProperty> getRentalPropertyByUserId(@PathVariable int userId) {
        String sql = "SELECT * FROM rental_property_located_view WHERE user_id = ?";
        Object[] params = { userId };

        List<RentalProperty> rentalProperties = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    RentalProperty rentalProperty = new RentalProperty();
                    rentalProperty.setId(rs.getInt("id"));
                    rentalProperty.setTitle(rs.getString("title"));
                    rentalProperty.setDescription(rs.getString("description"));
                    rentalProperty.setAvailabilityCalendar(rs.getString("availability_calendar"));
                    rentalProperty.setPrice(rs.getBigDecimal("price"));
                    rentalProperty.setMaxGuests(rs.getInt("max_guests"));
                    rentalProperty.setRules(rs.getString("rules"));
                    rentalProperty.setPhotos(rs.getString("photos"));
                    rentalProperty.setUpdatedAt(rs.getTimestamp("updated_at"));
                    rentalProperty.setCreatedAt(rs.getTimestamp("created_at"));
                    rentalProperty.setMinStay(rs.getInt("min_stay"));
                    rentalProperty.setMaxStay(rs.getInt("max_stay"));
                    rentalProperty.setCancellationPolicy(rs.getString("cancellation_policy"));
                    rentalProperty.setRating(rs.getBigDecimal("rating"));
                    rentalProperty.setAvailableInEmergency(rs.getBoolean("is_available_in_emergency"));
                    rentalProperty.setPetFriendly(rs.getBoolean("is_pet_friendly"));
                    rentalProperty.setHasParking(rs.getBoolean("has_parking"));
                    rentalProperty.setHasBalcony(rs.getBoolean("has_balcony"));
                    rentalProperty.setHasPool(rs.getBoolean("has_pool"));
                    rentalProperty.setUserId(rs.getInt("user_id"));
                    rentalProperty.setLocationID(rs.getInt("location_id"));
                    return rentalProperty;
                }
        );

        for (RentalProperty rentalProperty : rentalProperties) {
            System.out.println(rentalProperty.getTitle());
        }

        return rentalProperties;
    }
}
