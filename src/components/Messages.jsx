import React, { useEffect } from "react";
import { doc } from "firebase/firestore";
import { ChatContext } from "../context/ChatContext.jsx";
import { useContext, useState } from "react";
import { db } from "../firebase";
import Message from "./Message.jsx";
import { onSnapshot } from "@firebase/firestore";



const Messages = () => {



  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log("Messages in MESSAGES.JSX", messages);

  return (
    <div className="chat-area">

      {messages.map((m) => (
        m && <Message message={m} key={m.id}/> 
      ))}


      <Message/>
    </div>
  );
};

export default Messages;
