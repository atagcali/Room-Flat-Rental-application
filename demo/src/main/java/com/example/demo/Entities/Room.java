package com.example.demo.Entities;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class Room {
    private int id;
    private int rentalPropertyId;
    private String name;
    private String description;
    private int maxGuests;
    private BigDecimal price;
    private Timestamp updatedAt;
    private Timestamp createdAt;

    // Constructors, getters and setters go here

    public Room() {}

    public Room(int id, int rentalPropertyId, String name, String description, int maxGuests, BigDecimal price, Timestamp updatedAt, Timestamp createdAt) {
        this.id = id;
        this.rentalPropertyId = rentalPropertyId;
        this.name = name;
        this.description = description;
        this.maxGuests = maxGuests;
        this.price = price;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getRentalPropertyId() {
        return rentalPropertyId;
    }

    public void setRentalPropertyId(int rentalPropertyId) {
        this.rentalPropertyId = rentalPropertyId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getMaxGuests() {
        return maxGuests;
    }

    public void setMaxGuests(int maxGuests) {
        this.maxGuests = maxGuests;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Timestamp getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Timestamp updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}

