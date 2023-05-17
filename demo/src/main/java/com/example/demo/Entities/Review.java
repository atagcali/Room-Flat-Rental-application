package com.example.demo.Entities;

public class Review {
    private int reviewId;
    private int rating;
    private String review;
    private int homeownerId;
    private int travellerId;
    private int bookId;

    public Review() {
    }

    public Review(int reviewId, int rating, String review, int homeownerId, int travellerId, int bookId) {
        this.reviewId = reviewId;
        this.rating = rating;
        this.review = review;
        this.homeownerId = homeownerId;
        this.travellerId = travellerId;
        this.bookId = bookId;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }

    public int getHomeownerId() {
        return homeownerId;
    }

    public void setHomeownerId(int homeownerId) {
        this.homeownerId = homeownerId;
    }

    public int getTravellerId() {
        return travellerId;
    }

    public void setTravellerId(int travellerId) {
        this.travellerId = travellerId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}
