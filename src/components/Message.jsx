import React from "react";
import {
  faVideo,
  faEllipsisV,
  faImage,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Message = () => {
  return (
    <div className="chat-area">
      <div className="message owner">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>9:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello00000000000</p>
        </div>
      </div>

      <div className="message">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>10:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello2</p>
        </div>
      </div>


      <div className="message owner">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>9:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello00000000000</p>
        </div>
      </div>

      <div className="message">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>10:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello2</p>
        </div>
      </div>

      <div className="message owner">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>9:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello00000000000</p>
        </div>
      </div>

      <div className="message">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>10:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello2</p>
        </div>
      </div>

      <div className="message owner">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>9:55</span>
        </div>
        <div className="messageImage">
          <img src="src/images/trialmessage.jpg" alt="Image" />
        </div>
      </div>

      <div className="message">
        <div className="messageInfo">
          <img
            src="/src/images/avatar.png"
            alt="User Avatar"
            className="avatar"
            style={{ width: "40px", height: "40px" }}
          />
          <span>10:55</span>
        </div>
        <div className="messageContent">
          <p className="messageText">Hello2</p>
          <img src="src/images/trialmessage.jpg" alt="Image" />
        </div>
      </div>



      
    </div>
  );
};

export default Message;
