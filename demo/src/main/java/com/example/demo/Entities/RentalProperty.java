package com.example.demo.Entities;

import java.math.BigDecimal;
import java.sql.Timestamp;

public class RentalProperty {
    private int id;
    private String title;
    private String description;
    private String availabilityCalendar;
    private BigDecimal price;
    private int maxGuests;
    private String rules;
    private String photos;
    private Timestamp updatedAt;
    private Timestamp createdAt;
    private int minStay;
    private int maxStay;
    private String cancellationPolicy;
    private BigDecimal rating;
    private boolean isAvailableInEmergency;
    private boolean isPetFriendly;
    private boolean hasParking;
    private boolean hasBalcony;
    private boolean hasPool;
    private int userId;

    public RentalProperty() {
    }

    public RentalProperty(int id, String title, String description, String availabilityCalendar, BigDecimal price, int maxGuests, String rules, String photos, Timestamp updatedAt, Timestamp createdAt, int minStay, int maxStay, String cancellationPolicy, BigDecimal rating, boolean isAvailableInEmergency, boolean isPetFriendly, boolean hasParking, boolean hasBalcony, boolean hasPool, int userId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.availabilityCalendar = availabilityCalendar;
        this.price = price;
        this.maxGuests = maxGuests;
        this.rules = rules;
        this.photos = photos;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.minStay = minStay;
        this.maxStay = maxStay;
        this.cancellationPolicy = cancellationPolicy;
        this.rating = rating;
        this.isAvailableInEmergency = isAvailableInEmergency;
        this.isPetFriendly = isPetFriendly;
        this.hasParking = hasParking;
        this.hasBalcony = hasBalcony;
        this.hasPool = hasPool;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAvailabilityCalendar() {
        return availabilityCalendar;
    }

    public void setAvailabilityCalendar(String availabilityCalendar) {
        this.availabilityCalendar = availabilityCalendar;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getMaxGuests() {
        return maxGuests;
    }

    public void setMaxGuests(int maxGuests) {
        this.maxGuests = maxGuests;
    }

    public String getRules() {
        return rules;
    }

    public void setRules(String rules) {
        this.rules = rules;
    }

    public String getPhotos() {
        return photos;
    }

    public void setPhotos(String photos) {
        this.photos = photos;
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

    public int getMinStay() {
        return minStay;
    }

    public void setMinStay(int minStay) {
        this.minStay = minStay;
    }

    public int getMaxStay() {
        return maxStay;
    }

    public void setMaxStay(int maxStay) {
        this.maxStay = maxStay;
    }

    public String getCancellationPolicy() {
        return cancellationPolicy;
    }

    public void setCancellationPolicy(String cancellationPolicy) {
        this.cancellationPolicy = cancellationPolicy;
    }

    public BigDecimal getRating() {
        return rating;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public boolean isAvailableInEmergency() {
        return isAvailableInEmergency;
    }

    public void setAvailableInEmergency(boolean availableInEmergency) {
        isAvailableInEmergency = availableInEmergency;
    }

    public boolean isPetFriendly() {
        return isPetFriendly;
    }

    public void setPetFriendly(boolean petFriendly) {
        isPetFriendly = petFriendly;
    }

    public boolean isHasParking() {
        return hasParking;
    }

    public void setHasParking(boolean hasParking) {
        this.hasParking = hasParking;
    }

    public boolean isHasBalcony() {
        return hasBalcony;
    }

    public void setHasBalcony(boolean hasBalcony) {
        this.hasBalcony = hasBalcony;
    }

    public boolean isHasPool() {
        return hasPool;
    }

    public void setHasPool(boolean hasPool) {
        this.hasPool = hasPool;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}

