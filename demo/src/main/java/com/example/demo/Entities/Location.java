package com.example.demo.Entities;

public class Location {
    private int id;
    private String city;
    private String address;
    private String zipCode;
    private String country;
    private String neighborhood;
    private String district;

    // Constructors, getters and setters go here

    public Location() {}

    public Location(int id, String city, String address, String zipCode, String country, String neighborhood, String district) {
        this.id = id;
        this.city = city;
        this.address = address;
        this.zipCode = zipCode;
        this.country = country;
        this.neighborhood = neighborhood;
        this.district = district;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getNeighborhood() {
        return neighborhood;
    }

    public void setNeighborhood(String neighborhood) {
        this.neighborhood = neighborhood;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }
}

