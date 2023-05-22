package com.example.demo.controllers;
import com.example.demo.Entities.Review;
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
public class ReviewController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    @PostMapping("/reviews")
    void createReview(@Valid @RequestBody String jsonPayload) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        int rating = jsonNode.get("rating").asInt();
        String reviewText = jsonNode.get("review").asText();
        int homeownerId = jsonNode.get("homeownerId").asInt();
        int travellerId = jsonNode.get("travellerId").asInt();
        int bookId = jsonNode.get("bookId").asInt();

        jdbcTemplate.update(
                "INSERT INTO review (rating, review, homeowner_id, traveller_id, book_id) VALUES (?, ?, ?, ?, ?)",
                rating,
                reviewText,
                homeownerId,
                travellerId,
                bookId
        );
    }

    @PutMapping("/reviews/{id}")
    void updateReview(@PathVariable Long id, @Valid @RequestBody String jsonPayload) throws JsonProcessingException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(jsonPayload);

        int rating = jsonNode.get("rating").asInt();
        String reviewText = jsonNode.get("review").asText();
        int homeownerId = jsonNode.get("homeownerId").asInt();
        int travellerId = jsonNode.get("travellerId").asInt();
        int bookId = jsonNode.get("bookId").asInt();

        jdbcTemplate.update(
                "UPDATE review SET rating = ?, review = ?, homeowner_id = ?, traveller_id = ?, book_id = ? WHERE review_id = ?",
                rating,
                reviewText,
                homeownerId,
                travellerId,
                bookId,
                id
        );
    }

    @GetMapping("/reviews/homeowner/{homeownerId}")
    Collection<Review> getReviewsByHomeownerId(@PathVariable int homeownerId) {
        String sql = "SELECT * FROM review WHERE homeowner_id = ?";
        Object[] params = {homeownerId};

        List<Review> reviews = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Review review = new Review();
                    review.setReviewId(rs.getInt("review_id"));
                    review.setRating(rs.getInt("rating"));
                    review.setReview(rs.getString("review"));
                    review.setHomeownerId(rs.getInt("homeowner_id"));
                    review.setTravellerId(rs.getInt("traveller_id"));
                    review.setBookId(rs.getInt("book_id"));
                    return review;
                }
        );

        for (Review review : reviews) {
            System.out.println(review.getReviewId());
        }

        return reviews;
    }

    @GetMapping("/reviews/{reviewId}")
    Review getReviewById(@PathVariable int reviewId) {
        String sql = "SELECT * FROM review WHERE review_id = ?";
        Object[] params = {reviewId};

        List<Review> reviews = jdbcTemplate.query(
                sql,
                params,
                (rs, rowNum) -> {
                    Review review = new Review();
                    review.setReviewId(rs.getInt("review_id"));
                    review.setRating(rs.getInt("rating"));
                    review.setReview(rs.getString("review"));
                    review.setHomeownerId(rs.getInt("homeowner_id"));
                    review.setTravellerId(rs.getInt("traveller_id"));
                    review.setBookId(rs.getInt("book_id"));
                    return review;
                }
        );

        if (reviews.isEmpty()) {
            throw new NoSuchElementException("Review not found with ID: " + reviewId);
        }

        System.out.println(reviews.get(0).getReviewId());
        return reviews.get(0);
    }

}
