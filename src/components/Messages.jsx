import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../context/ChatContext.jsx";
import Message from "./Message.jsx";
import { onSnapshot, doc } from "@firebase/firestore";
import { db } from "../firebase";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const getUniqueDates = (messages) => {
    const uniqueDates = new Set();
    messages.forEach((message) => {
      uniqueDates.add(new Date(message.date.toDate()).toDateString());
    });
    return Array.from(uniqueDates);
  };

  const formatDateLine = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (isSameDate(today, date)) {
      return "Today";
    } else if (isSameDate(yesterday, date)) {
      return "Yesterday";
    } else {
      return new Intl.DateTimeFormat('en-US', { month: 'long', day: '2-digit', year: 'numeric' }).format(date);
    }
  };

  const isSameDate = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  return (
    <Box ref={chatAreaRef} sx={{ flexGrow: 1, overflowY: 'auto', padding: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      {getUniqueDates(messages).map((date) => (
        <React.Fragment key={date}>
          <Typography variant="subtitle2" sx={{ textAlign: 'center', my: 1 }}>
            {formatDateLine(date)}
          </Typography>
          <Divider />
          {messages.filter((message) => formatDateLine(message.date.toDate()) === formatDateLine(date)).map((m) => (
            <Message message={m} key={m.id} />
          ))}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default Messages;
