import React, { useEffect } from 'react';

const ChatRoom = () => {
  useEffect(() => {
    const chatSocket = new WebSocket(
      `ws://${window.location.host}/ws/chat/${roomName}/`
    );

    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      document.querySelector('#chat-log').value += data.message + '\n';
    };

    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };

    return () => {
      chatSocket.close();
    };
  }, [roomName]);

  const handleMessageEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    chatSocket.send(JSON.stringify({
      'message': message
    }));
    // messageInputDom.value = '';
  };

  return (
    <div>
      <textarea id="chat-log" cols="100" rows="20"></textarea>
      <br />
      <input
        id="chat-message-input"
        type="text"
        size="100"

      />
      <br />
      <button id="chat-message-submit" >
        Send
      </button>
    </div>
  );
};

export default ChatRoom; 
