package com.example.demo.Entities;

public class Traveller {
    private int userId;

    public Traveller() {
    }

    public Traveller(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
