package com.example.demo.Entities;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;
public class Booking {
    private int id;
    private int rentalPropertyId;
    private Date checkinDate;
    private Date checkoutDate;
    private String status;
    private BigDecimal pricePaid;
    private Timestamp cancelledAt;
    private Timestamp updatedAt;
    private Timestamp createdAt;

    public Booking() {
    }

    public Booking(int id, int rentalPropertyId, Date checkinDate, Date checkoutDate, String status, BigDecimal pricePaid, Timestamp cancelledAt, Timestamp updatedAt, Timestamp createdAt) {
        this.id = id;
        this.rentalPropertyId = rentalPropertyId;
        this.checkinDate = checkinDate;
        this.checkoutDate = checkoutDate;
        this.status = status;
        this.pricePaid = pricePaid;
        this.cancelledAt = cancelledAt;
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

    public Date getCheckinDate() {
        return checkinDate;
    }

    public void setCheckinDate(Date checkinDate) {
        this.checkinDate = checkinDate;
    }

    public Date getCheckoutDate() {
        return checkoutDate;
    }

    public void setCheckoutDate(Date checkoutDate) {
        this.checkoutDate = checkoutDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getPricePaid() {
        return pricePaid;
    }

    public void setPricePaid(BigDecimal pricePaid) {
        this.pricePaid = pricePaid;
    }

    public Timestamp getCancelledAt() {
        return cancelledAt;
    }

    public void setCancelledAt(Timestamp cancelledAt) {
        this.cancelledAt = cancelledAt;
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
