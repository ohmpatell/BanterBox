import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useRef } from "react";
import { useEffect } from "react";

const Message = ({ message }) => {
  
  if (!message) {
    return <div className="chat-area"></div>;
  }

else{
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const messageRef = useRef();

  useEffect(() => {

    if(messageRef.current){
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [message]);

const messageTime = message.date.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
      <div className= {`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
          <img
            src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
        <span className="text-muted font-weight-normal">{messageTime}</span>

        </div>
        <div className="messageContent">
          <p className="messageText">{message.text}</p>
          {message.img && (
            <img
              src={message.img}
              alt="message img"
              className="messageImage"
            />
          )}
        </div>
      </div>
  );
}
};

export default Message;
