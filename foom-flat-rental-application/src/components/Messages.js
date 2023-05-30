import React, { useState, useEffect } from "react";

function MessagePage() {
    const sampleUsers = [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Jane Smith" },
        { id: 3, name: "Michael Johnson" }
      ];
      
      const sampleMessages = [
        { id: 1, senderId: 1, recipientId: 2, content: "Hello Jane!" },
        { id: 2, senderId: 2, recipientId: 1, content: "Hi John! How are you?" },
        { id: 3, senderId: 1, recipientId: 2, content: "I'm good, thanks! How about you?" },
        { id: 4, senderId: 2, recipientId: 1, content: "I'm doing great!" }
      ];
  const [users, setUsers] = useState(sampleUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(sampleMessages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Fetch the list of users from the server
    fetch("/api/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);

    // Fetch the messages between the current user and the selected user
    fetch(`/api/messages?user=${user.id}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error:", error));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();

    // Send the new message to the server
    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipient: selectedUser.id, content: newMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new message to the messages array
        setMessages((prevMessages) => [...prevMessages, data]);

        // Clear the input field
        setNewMessage("");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Message Page</h1>
      <div>
        <h2>Users:</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedUser && (
        <div>
          <h2>Chat with {selectedUser.name}:</h2>
          <div>
            {messages.map((message) => (
              <div key={message.id}>
                <strong>{message.sender}</strong>: {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default MessagePage;
