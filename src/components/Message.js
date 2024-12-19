import React from 'react';
import PropTypes from 'prop-types';
import './Message.css'; // Optional: CSS file for styling

const Message = ({ sender, text, timestamp }) => {
  return (
    <div className={`message ${sender === 'user' ? 'user' : 'bot'}`}>
      <div className="message-content">
        <p>{text}</p>
        <span className="timestamp">{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

// Define the expected props
Message.propTypes = {
  sender: PropTypes.oneOf(['user', 'bot']).isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default Message;
