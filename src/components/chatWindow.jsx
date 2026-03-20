import { useState } from "react";
import Message from "./Message";

export default function ChatWindow({ selectedCourse }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // simulate API delay
    setTimeout(() => {
      const aiMsg = {
        role: "ai",
        text: "This is a mock response based on your course."
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 800);
  };

  if (!selectedCourse) {
    return <div style={{ padding: "20px" }}>Select a course to start chatting</div>;
  }

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: "20px" }}>
      
      <div style={{ flex: 1, overflowY: "auto" }}>
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
      </div>

      <div style={{ display: "flex", marginTop: "10px" }}>
        <input
          style={{ flex: 1, padding: "10px" }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

    </div>
  );
}