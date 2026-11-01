import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { supabase } from "../../supabaseClient";
import "./MessageSideBar.css";

let channel;

function MessageSideBar() {

  function getLocaleTimeString() {
    // time only
    var timestamp = new Date();
    const offset = timestamp.getTimezoneOffset() * 60000; // milliseconds
    const local = new Date(timestamp.getTime() - offset);
    return local.toISOString().slice(11, 19);
  }

  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    // no Supabase env vars at build time -- skip the effect entirely so a
    // misconfigured build just loses chat instead of crashing (see
    // supabaseClient.js)
    if (!supabase) return;

    // subscribe to the shared broadcast channel. self:false because we
    // append our own messages locally in sendChat below -- waiting for our
    // own broadcast to echo back raced with slow subscribes and could drop
    // the sender's own message.
    channel = supabase.channel("pixelgram-chat", {
      config: { broadcast: { self: false } },
    });

    // listen for chat events
    channel
      .on("broadcast", { event: "chat" }, ({ payload }) => {
        // when we receive a chat, add it into our messages array in state
        setMessages((messages) => [...messages, payload]);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setIsSubscribed(true);
      });

    // when component unmounts, unsubscribe
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendChat = (e) => {
    e.preventDefault();
    // broadcast a message
    if (!chatInput) {
      alert("Please enter a message");
    } else if (chatInput.length > 100) {
      alert("Message is too long");
    } else if (!isSubscribed) {
      alert("Chat is still connecting, please wait a moment");
    } else {
      const payload = {
        user: user.username,
        msg: chatInput,
        time: getLocaleTimeString(),
      };
      channel.send({
        type: "broadcast",
        event: "chat",
        payload,
      });
      // broadcast.self is false above, so the sender has to add its own
      // message locally -- this also means it shows up instantly instead
      // of waiting on a round trip through Supabase.
      setMessages((messages) => [...messages, payload]);
    }
    // clear the input field after the message is sent
    setChatInput("");
  };

  return (
    user &&
    supabase && (
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
              disabled={!isSubscribed}
            />
            <div className="btn-container">
              <button className="chat-btn" type="submit" disabled={!isSubscribed}>
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
