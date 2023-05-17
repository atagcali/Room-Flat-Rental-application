package com.example.demo.Entities;

public class UserMessage {
    private int id;
    private int senderId;
    private int receiverId;
    private int messageId;

    public UserMessage() {
    }

    public UserMessage(int id, int senderId, int receiverId, int messageId) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.messageId = messageId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getSenderId() {
        return senderId;
    }

    public void setSenderId(int senderId) {
        this.senderId = senderId;
    }

    public int getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(int receiverId) {
        this.receiverId = receiverId;
    }

    public int getMessageId() {
        return messageId;
    }

    public void setMessageId(int messageId) {
        this.messageId = messageId;
    }
}
