

const App = () => {
  return (
   <>
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
   </>
  );
};

export default App;
