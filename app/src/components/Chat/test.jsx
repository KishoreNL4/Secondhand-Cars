import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../../firebase-config";

function Chat() {
  const [daata, setDaata] = useState([]);
  const [verifyStatus, setVerifyStatus] = useState("");

  const [showChat, setShowChat] = useState(true); // State to control the visibility of the chat component

  const [messages, setMessages] = useState([
    { sender: "user", content: "Hello!" },
    { sender: "receiver", content: "Hi there! How are you?" },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;

    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
    });
    setNewMessage("");
  };

  const { _id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/description/${_id}`);
        console.log(response.data.user);
        setDaata(response.data.user);
        setVerifyStatus(response.data.user.verifyStatus);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleCloseChat = () => {
    setShowChat(false);
  };

  if (!showChat) {
    return null;
  }

  return (
    <div>
      <div className="chatbox">
        <div className="chathead">
          <div className="chatimaname">
            <img
              className="chatimg"
              src="https://www.shareicon.net/data/2015/08/12/84086_user_512x512.png"
              alt=""
            />
            <div>
              <h4 className="chatname">{daata.ownername}</h4>
            </div>
            <div className="closeiconnchat" onClick={handleCloseChat}>
              &times;
            </div>
          </div>
        </div>
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user" : "receiver"
              }`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className="inparea">
          <input
            type="text"
            className="mesresponce"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            placeholder="Type your message..."
          />
          <button className="chatsend" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
