import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "../../axios";
import { useParams } from "react-router-dom";

function Chat() {
  const [daata, setDaata] = useState({});
  const [verifyStatus, setVerifyStatus] = useState("");
  const [showChat, setShowChat] = useState(true); // State to control the visibility of the chat component

  const [messages, setMessages] = useState([
    { sender: "user", content: "Hello!" },
    { sender: "receiver", content: "Hi there! How are you?" },
  ]);

  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() !== "") {
      setMessages([...messages, { sender: "user", content: userInput }]);
      setUserInput("");
    }
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
  }, [_id]); // Include _id as a dependency to re-fetch data when it changes

  const handleCloseChat = () => {
    // Set the state to hide the chat component
    setShowChat(false);
  };

  if (!showChat) {
    return null; // If the showChat state is false, return null to hide the chat component
  }

  return (
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
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button className="chatsend" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
