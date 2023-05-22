package com.example.demo.controllers;
import com.example.demo.Entities.Location;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PutMapping;

import jakarta.validation.Valid;

import java.util.Collection;
import java.sql.SQLException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api")
public class LocationController {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostMapping("/locations")
    void createLocation(@Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String city = jsonNode.get("city").asText();
        String address = jsonNode.get("address").asText();
        String zipCode = jsonNode.get("zipCode").asText();
        String country = jsonNode.get("country").asText();
        String neighborhood = jsonNode.get("neighborhood").asText();
        String district = jsonNode.get("district").asText();

        jdbcTemplate.update(
                "INSERT INTO \"location\" (city, address, zip_code, country, neighborhood, district) VALUES (?, ?, ?, ?, ?, ?)",
                city,
                address,
                zipCode,
                country,
                neighborhood,
                district
        );
    }

    @PutMapping("/locations/{id}")
    void updateLocation(@PathVariable int id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException{
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        String city = jsonNode.get("city").asText();
        String address = jsonNode.get("address").asText();
        String zipCode = jsonNode.get("zipCode").asText();
        String country = jsonNode.get("country").asText();
        String neighborhood = jsonNode.get("neighborhood").asText();
        String district = jsonNode.get("district").asText();

        jdbcTemplate.update(
                "UPDATE \"location\" SET city = ?, address = ?, zip_code = ?, country = ?, neighborhood = ?, district = ? WHERE id = ?",
                city,
                address,
                zipCode,
                country,
                neighborhood,
                district,
                id
        );
    }

    @GetMapping("/locations")
    Collection<Location> getLocations() {
        List<Location> locations = jdbcTemplate.query(
                "SELECT * FROM \"location\"",
                (rs, rowNum) -> {
                    Location location = new Location();
                    location.setId(rs.getInt("id"));
                    location.setCity(rs.getString("city"));
                    location.setAddress(rs.getString("address"));
                    location.setZipCode(rs.getString("zip_code"));
                    location.setCountry(rs.getString("country"));
                    location.setNeighborhood(rs.getString("neighborhood"));
                    location.setDistrict(rs.getString("district"));
                    return location;
                }
        );

        for (Location location : locations) {
            System.out.println(location.getId());
        }

        return locations;
    }

    @GetMapping("/locations/{id}")
    Location getLocationById(@PathVariable int id) {
        String sql = "SELECT * FROM \"location\" WHERE id = ?";
        Object[] params = { id };

        List<Location> locations = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Location location = new Location();
                    location.setId(rs.getInt("id"));
                    location.setCity(rs.getString("city"));
                    location.setAddress(rs.getString("address"));
                    location.setZipCode(rs.getString("zip_code"));
                    location.setCountry(rs.getString("country"));
                    location.setNeighborhood(rs.getString("neighborhood"));
                    location.setDistrict(rs.getString("district"));
                    return location;
                }
        );

        if (locations.isEmpty()) {
            throw new NoSuchElementException("Location not found with ID: " + id);
        }

        System.out.println(locations.get(0).getId());
        return locations.get(0);
    }

}
