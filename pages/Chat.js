import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import withAuth from "@/components/withAuth";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://snappersstudyspace.vercel.app/api";

const ChatWithSnaps = () => {
  const [messages, setMessages] = useState([
    { sender: "Snapper", text: "Hi! I'm Snapper, your study assistant. How can I help you today?" }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userTyping, setUserTyping] = useState(false);
  const [chatStatus, setChatStatus] = useState("waiting"); // "waiting", "thinking", "talking"
  const messagesEndRef = useRef(null);

  // Load messages from localStorage only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMessages = localStorage.getItem("chatHistory");
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages));
      }
    }
  }, []);

  // Save messages to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    setChatStatus("thinking"); // Snapper is thinking
    setUserTyping(false);

    const userMessage = { sender: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, { // Note to self, in future have more distinct names. This gave me a hard time.
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { sender: "Snapper", text: data.response };

      setMessages([...updatedMessages, botMessage]);
      setChatStatus("talking"); // Snapper is responding
    } catch (error) {
      console.error("Error:", error);
      setMessages([...updatedMessages, { sender: "Snapper", text: "Error fetching response. Please try again." }]);
      setChatStatus("waiting");
    } finally {
      setLoading(false);
      setTimeout(() => setChatStatus("waiting"), 2000); // Reset to waiting after Snapper finishes responding
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    setUserTyping(true);
    setChatStatus("waiting"); // Snapper is waiting for user input
  };

  const getSnapperImage = () => {
    switch (chatStatus) {
      case "thinking":
        return "/snapperthinking.png"; // GPT is processing
      case "talking":
        return "/snappertalking.png"; // GPT is responding
      default:
        return "/snapperwaiting.png"; // User is typing
    }
  };

  return (
    <PageContainer>
      <ChatContainer>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              {msg.text}
            </Message>
          ))}
          <div ref={messagesEndRef} />
        </MessagesContainer>
        <InputContainer>
          <ChatInput
            type="text"
            placeholder="Talk to Snapper..."
            value={input}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <SendButton onClick={handleSendMessage} disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </SendButton>
        </InputContainer>
      </ChatContainer>
      <SnapperImage src={getSnapperImage()} alt="Snapper Status" />
    </PageContainer>
  );
};


const PageContainer = styled.div`
  background: #32643f;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
`;

const ChatContainer = styled.div`
  width: 90%;
  max-width: 900px;
  height: 80vh;
  background: #1E2F23;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Message = styled.div`
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 1rem;
  line-height: 1.4;
  white-space: pre-wrap;
  word-wrap: break-word;
  background-color: ${({ sender }) => (sender === "user" ? "#32643f" : "rgb(57, 126, 62)")};
  color:${({ sender }) => (sender === "user" ? "#F9ECCC" : "white")};
  align-self: ${({ sender }) => (sender === "user" ? "flex-end" : "flex-start")};
  border-bottom-left-radius: ${({ sender }) => (sender === "Snapper" ? "5px" : "18px")};
  border-bottom-right-radius: ${({ sender }) => (sender === "user" ? "5px" : "18px")};
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  border-top: 1px solid #32643f;
  padding: 10px;
  background: #1E2F23;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 12px;
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid #3c5c47;
  background: #3c5c47;
  color: #F9ECCC;
  outline: none;
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
`;

const SendButton = styled.button`
  padding: 12px 18px;
  font-size: 1rem;
  background-color: #32643f;
  color: #F9ECCC;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color:rgb(57, 126, 62);
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const SnapperImage = styled.img`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 300px;
  height: auto;
`;

export default withAuth(ChatWithSnaps);
