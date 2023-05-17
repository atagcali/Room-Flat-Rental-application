package com.example.demo.Entities;

import java.sql.Timestamp;

public class Notification {
    private int id;
    private String message;
    private Timestamp timestamp;
    private boolean readStatus;
    private int userId;

    public Notification() {
    }

    public Notification(int id, String message, Timestamp timestamp, boolean readStatus, int userId) {
        this.id = id;
        this.message = message;
        this.timestamp = timestamp;
        this.readStatus = readStatus;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isReadStatus() {
        return readStatus;
    }

    public void setReadStatus(boolean readStatus) {
        this.readStatus = readStatus;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
