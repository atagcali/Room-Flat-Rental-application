package com.example.demo.Entities;

public class BookTravelHomeowner {
    private int homeownerId;
    private int travellerId;
    private int bookId;

    public BookTravelHomeowner() {
    }

    public BookTravelHomeowner(int homeownerId, int travellerId, int bookId) {
        this.homeownerId = homeownerId;
        this.travellerId = travellerId;
        this.bookId = bookId;
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
