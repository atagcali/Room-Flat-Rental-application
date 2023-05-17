package com.example.demo.Entities;

public class Homeowner {
    private int userId;

    public Homeowner() {
    }

    public Homeowner(int userId) {
        this.userId = userId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
