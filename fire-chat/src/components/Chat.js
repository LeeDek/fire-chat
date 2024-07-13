import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "./../firebase-config";
import "./Chat.css";

const Chat = (props) => {
  const { room } = props;
  const [newMessages, setNewMessages] = useState("");
  const [messages, setMessages] = useState([]);

  const messageRef = collection(db, "messages");

  useEffect(() => {
    const queryMessages = query(messageRef, where("room", "==", room));
    const unsubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessages === "") return;

    await addDoc(messageRef, {
      text: newMessages,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMessages("");
  };
  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room}</h1>
      </div>
      <div>
        {messages.map((message) => (
          <h1>{message.text}</h1>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          className="new-massage__input"
          placeholder="Tye you message here..."
          onChange={(e) => setNewMessages(e.target.value)}
          value={newMessages}
        />
        <button type="submit" className="sendBtn">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
