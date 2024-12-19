import React, { useState, useEffect } from 'react';
import { saveChat, getChatHistory } from '../services/chatService';

const Chatbot = () => {
  const [messages, setMessages] = useState(getChatHistory());
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim() !== '') {
      const newMessage = {
        text: input,
        timestamp: new Date().toLocaleString(),
        sender: 'user',
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      saveChat(newMessage);

      // Simulate bot response
      const botMessage = {
        text: 'This is a bot response.',
        timestamp: new Date().toLocaleString(),
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      saveChat(botMessage);

      setInput('');
    }
  };

  const handleResetChat = () => {
    localStorage.removeItem('chatHistory');
    setMessages([]);
  };

  return (
    <div className="chatbot">
      <div className="chat-history">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p><strong>{message.sender}</strong>: {message.text}</p>
            <small>{message.timestamp}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleResetChat}>Reset</button>
      </div>
    </div>
  );
};

export default Chatbot;
