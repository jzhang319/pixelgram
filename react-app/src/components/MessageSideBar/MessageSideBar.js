import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import "./MessageSideBar.css";

let socket;

function MessageSideBar() {
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

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.session.user);

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
    if (!chatInput) {
      alert("Please enter a message");
    } else if (chatInput.length > 100) {
      alert("Message is too long");
    } else {
      // console.log(messages, " <---- messages");
      socket.emit("chat", {
        user: user.username,
        msg: chatInput,
        time: getLocaleTimeString(),
      });
    }
    // clear the input field after the message is sent
    setChatInput("");
  };

  return (
    user && (
      <div className="message-side-container">
        <h3 className="message-title-bar">Generals Chat</h3>

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
        <ul className="chat-box-container">
          {messages.map((message, ind) => (
            // console.log(message, " <---- message"),
            <li className="each-message" key={ind}>
              {`${message.user}: ${message.msg} - ${message.time}`}
            </li>
          ))}
        </ul>
      </div>
    )
  );
}

export default MessageSideBar;
