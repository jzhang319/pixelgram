import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./MessageSideBar.css";

let socket;

function MessageSideBar() {
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

  function getLocaleDateTimeString() {
    // date and time
    var timestamp = new Date();
    const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
    const local = new Date(timestamp.getTime() - offset);
    return local.toISOString().slice(0, 19).replace("T", " ");
  }

  function getLocaleDateString() {
    // date only
    var timestamp = new Date();
    const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
    const local = new Date(timestamp.getTime() - offset);
    return local.toISOString().slice(0, 10);
  }

  function getLocaleTimeString() {
    // time only
    var timestamp = new Date();
    const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
    const local = new Date(timestamp.getTime() - offset);
    return local.toISOString().slice(11, 19);
  }

  useEffect(() => {
    // create websocket/connect
    socket = io();

    // listen for chat events
    socket.on("chat", (chat) => {
      // when we receive a chat, add it into our messages array in state
      setMessages((messages) => [...messages, chat]);
    });

    // when component unmounts, disconnect
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    // emit a message
    socket.emit("chat", { user: user.username, msg: chatInput });
    // clear the input field after the message is sent
    setChatInput("");
  };

  return (
    user && (
      <div className="message-side-container">
        <h2 className="message-title-bar">Generals Chat</h2>

        <form className="chat-container" onSubmit={sendChat}>
          <div className="chat-input-buttons-too">
            <input
              className="chat-input-bar"
              type="text"
              placeholder="Chat here ..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <div className="btn-container">
              <button className="chat-btn" type="submit">
                Send
              </button>
              {/* <button className="chat-btn">Leave</button> */}
            </div>
          </div>
        </form>
        <div className="chat-box-container">
          {messages.reverse().map((message, ind) => (
            <div key={ind}>
              {`${message.user}: ${message.msg}`}
            </div>
          ))}
        </div>
      </div>
    )
  );
}

export default MessageSideBar;
