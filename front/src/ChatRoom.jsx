// import React, { useEffect, useState } from 'react';

// const ChatRoom = () => {
//   const [roomName, setRoomName] = useState(window.location.href.split('/')[3]);
//   useEffect(() => {
//     setRoomName(window.location.href.split('/')[3]);
//     // setRoomName()
//     console.log(roomName)
//     const chatSocket = new WebSocket(
//       `ws://${window.location.host}/ws/chat/${roomName}/`
//     );

//     chatSocket.onopen = function(event) {
//       console.log("WebSocket connection established.");
//     };

//     // chatSocket.onmessage = function(event) {
//     //   console.log("Message received 1: ", event.data);
//     // };
//     chatSocket.onmessage = function (e) {
//       const data = JSON.parse(e.data);
//       document.querySelector('#chat-log').value += data.message + '\n';
//     };

//     chatSocket.onerror = function(error) {
//       console.error("WebSocket error 2: ", error);
//     };

//     chatSocket.onclose = function(event) {
//       console.log("WebSocket connection closed with code: ", event.code);
//     };


//     // chatSocket.onmessage = function (e) {
//     //   const data = JSON.parse(e.data);
//     //   document.querySelector('#chat-log').value += data.message + '\n';
//     // };

//     // chatSocket.onclose = function (e) {
//     //   console.error('Chat socket closed unexpectedly');
//     // };

//     // return () => {
//     //   chatSocket.close();
//     // };
//   }, [window.location.href.split('/')[3]]);

//   const handleMessageEnterKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   const sendMessage = () => {
//     const messageInputDom = document.querySelector('#chat-message-input');
//     const message = messageInputDom.value;
//     chatSocket.send(JSON.stringify({
//       'message': message
//     }));
//     // messageInputDom.value = '';
//   };

//   return (
//     <div>
//       <textarea id="chat-log" cols="100" rows="20"></textarea>
//       <br />
//       <input
//         id="chat-message-input"
//         type="text"
//         size="100"

//       />
//       <br />
//       <button id="chat-message-submit" >
//         Send
//       </button>
//     </div>
//   );
// };

// export default ChatRoom; 

import React, { useEffect, useState } from 'react';

const ChatRoom = () => {
  const [roomName, setRoomName] = useState(() => window.location.href.split('/')[3]);
  const [chatSocket, setChatSocket] = useState(null);

  useEffect(() => {
    const roomName = window.location.href.split('/')[3];
    setRoomName(roomName);

    // const socket = new WebSocket(
    //   `ws://${window.location.host}/ws/chat/${roomName}/`
    // );
    const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);

    socket.onopen = function(event) {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = function(event) {
      const data = JSON.parse(event.data);
      document.querySelector('#chat-log').value += data.message + '\n';
    };

    socket.onerror = function(error) {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = function(event) {
      console.log("WebSocket connection closed with code: ", event.code);
    };

    setChatSocket(socket);

    return () => {
      socket.close();
    };
  }, [window.location.href.split('/')[3]]);

  const handleMessageEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (chatSocket) {
      const messageInputDom = document.querySelector('#chat-message-input');
      const message = messageInputDom.value;
      chatSocket.send(JSON.stringify({
        'message': message
      }));
      messageInputDom.value = '';
    }
  };

  return (
    <div>
      <textarea id="chat-log" cols="100" rows="20" readOnly></textarea>
      <br />
      <input
        id="chat-message-input"
        type="text"
        size="100"
        onKeyPress={handleMessageEnterKeyPress}
      />
      <br />
      <button id="chat-message-submit" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
};

export default ChatRoom;
