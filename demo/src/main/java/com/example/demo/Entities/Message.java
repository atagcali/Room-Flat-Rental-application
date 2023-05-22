package com.example.demo.Entities;
import java.sql.Timestamp;

public class Message {
    private int id;
    private String messageBlock;
    private Timestamp timestamp;
    private Timestamp updatedAt;
    private Timestamp createdAt;
    private int senderID;
    private int receiverID;

    public Message(int id, String messageBlock, Timestamp timestamp, Timestamp updatedAt, Timestamp createdAt, int senderID, int receiverID) {
        this.id = id;
        this.messageBlock = messageBlock;
        this.timestamp = timestamp;
        this.updatedAt = updatedAt;
        this.createdAt = createdAt;
        this.senderID = senderID;
        this.receiverID = receiverID;
    }

    public int getSenderID() {
        return senderID;
    }

    public void setSenderID(int senderID) {
        this.senderID = senderID;
    }

    public int getReceiverID() {
        return receiverID;
    }

    public void setReceiverID(int receiverID) {
        this.receiverID = receiverID;
    }

    public Message() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMessageBlock() {
        return messageBlock;
    }

    public void setMessageBlock(String messageBlock) {
        this.messageBlock = messageBlock;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
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