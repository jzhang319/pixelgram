import React from "react";
import "./MessageSideBar.css";

function MessageSideBar() {
  return (
    <div className="message-side-container">
      <h1 className="message-title-bar">MessageSideBar</h1>

      <div className="chat-container">
        <div className="chat-input-buttons-too">
          <input
            className="chat-input-bar"
            type="text"
            placeholder="Chat here ..."
          />
          <div className="btn-container">
            <button className="chat-btn">Send</button>
            <button className="chat-btn">Leave</button>
          </div>
        </div>
      </div>
      <div className="chat-box-container">user messages :</div>
    </div>
  );
}

export default MessageSideBar;
