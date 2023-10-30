import React from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { useRef } from "react";
import { useEffect } from "react";

const Message = ({ message }) => {

  
  if (!message) {
    return <div className="chat-area">Select a chat</div>;
  }

else{
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);


  console.log("Messagessss: " + message);

  const messageRef = useRef();

  useEffect(() => {

    if(messageRef.current){
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }

  }, [message]);

  return (
      <div className= {`message ${message.senderId === currentUser.uid && "owner"}`}>
        <div className="messageInfo">
          <img
            src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL}
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>9:55</span>
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
