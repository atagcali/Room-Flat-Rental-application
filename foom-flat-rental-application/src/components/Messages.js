import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Fetch users from the backend API
    axios.get('http://localhost:8080/api/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    // Retrieve the current user from local storage
    const storedCurrentUser = localStorage.getItem('userData');
    if (storedCurrentUser) {
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);

    // Fetch messages between the current user and selected user
    axios.get(`http://localhost:8080/api/messages/${currentUser.userId}/${user.userId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  };
  const handleSendMessage = () => {
    axios.post('http://localhost:8080/api/messages', {
      senderId: currentUser.userId,
      receiverId: selectedUser.userId,
      messageBlock: newMessage
    })
      .then(response => {
        // Update the messages list with the newly created message
        setMessages(prevMessages => [...prevMessages, response.data]);

        // Clear the new message input
        setNewMessage('');
      })
      .catch(error => {
        console.error('Error creating message:', error);
      });
  };

  // Save the current user to local storage when it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  console.log(users.length);
  return (
    <div>
      <h2>User List:</h2>
      <ul>
        {users.map(user => (
          <li key={user.id} onClick={() => handleUserSelect(user)}>
            {user.name}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div>
          <h2>Chat with {selectedUser.name}:</h2>
          <div className="messages">
            {messages.map(message => (
              <div key={message.id}>
                <p>{message.senderId}: {message.messageBlock}  {message.timestamp}</p>
              </div>
            ))}
          </div>
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default Messages;

