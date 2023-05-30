import React, { useState } from 'react';
import './MessageWindow.css';

const MessageWindow = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How are you?' },
    { id: 2, text: 'Are you available this weekend?' },
    { id: 3, text: "Let's meet for lunch tomorrow." },
  ]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`message-window ${isOpen ? 'open' : ''}`}>
      <div className="message-toggle" onClick={handleToggle}>
        <span className="toggle-icon"></span>
      </div>
      {isOpen && (
        <div className="message-content">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div key={message.id}>{message.text}</div>
            ))
          ) : (
            <div className="no-messages">No messages</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageWindow;
