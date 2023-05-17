package com.example.demo.Entities;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
public class Payment {
    private int id;
    private String paymentMethod;
    private BigDecimal amount;
    private Date date;
    private int homeownerId;
    private int travellerId;
    private Timestamp updatedAt;
    private Timestamp createdAt;

    public Payment() {
    }

    public Payment(int id, String paymentMethod, BigDecimal amount, Date date, int homeownerId, int travellerId, Timestamp updatedAt, Timestamp createdAt) {
        this.id = id;
        this.paymentMethod = paymentMethod;
        this.amount = amount;
        this.date = date;
        this.homeownerId = homeownerId;
        this.travellerId = travellerId;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
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