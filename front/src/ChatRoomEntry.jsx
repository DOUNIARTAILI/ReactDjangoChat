import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom'; // Import useHistory
import { useNavigate } from "react-router-dom";

const ChatRoomEntry = () => {
  const [roomName, setRoomName] = useState('');
//   const history = useHistory(); // Get history from react-router-dom
    const navigate = useNavigate();

  const handleInputChange = (e) => {
    setRoomName(e.target.value);
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      enterRoom();
    }
  };

  const enterRoom = () => {
    // history.push(`/chat/${roomName}`); // Navigate to chat room
    navigate(  `/${roomName}`);
};

  return (
    <div>
      <p>What chat room would you like to enter?</p>
      <input
        id="room-name-input"
        type="text"
        size="100"
        value={roomName}
        onChange={handleInputChange}
        onKeyUp={handleEnterKeyPress}
        autoFocus
      />
      <br />
      <button id="room-name-submit" onClick={enterRoom}>
        Enter
      </button>
    </div>
  );
};

export default ChatRoomEntry;
