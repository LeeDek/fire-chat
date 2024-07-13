import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./../firebase-config";

const Chat = (props) => {
  const { room } = props;
  const [newMessages, setNewMessages] = useState("");

  const messageRef = collection(db, "messages");

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
