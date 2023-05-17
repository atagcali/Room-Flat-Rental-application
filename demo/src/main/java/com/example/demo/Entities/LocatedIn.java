package com.example.demo.Entities;

public class LocatedIn {
    private int rentalPropertyId;
    private int locationId;

    public LocatedIn() {
    }

    public LocatedIn(int rentalPropertyId, int locationId) {
        this.rentalPropertyId = rentalPropertyId;
        this.locationId = locationId;
    }

    public int getRentalPropertyId() {
        return rentalPropertyId;
    }

    public void setRentalPropertyId(int rentalPropertyId) {
        this.rentalPropertyId = rentalPropertyId;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }
}

