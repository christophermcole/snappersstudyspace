import React, { useState } from "react";
import styled from "styled-components";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"; // Ensure correct API endpoint

const ChatWithSnaps = () => {
  const [messages, setMessages] = useState([
    { sender: "snaps", text: "Hi! I'm Snapper, and I'm here to assist you with all of your studying needs. How can I help you?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/Chat`, { // Fixed endpoint (lowercase)
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = { sender: "snaps", text: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "snaps", text: "Error fetching response. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Header>Chat with Snaps</Header>
      <ChatContainer>
        <MessagesContainer>
          {messages.map((msg, index) => (
            <Message key={index} sender={msg.sender}>
              {msg.text}
            </Message>
          ))}
        </MessagesContainer>
        <InputContainer>
          <ChatInput
            type="text"
            placeholder="Talk to Snapper..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <SendButton onClick={handleSendMessage} disabled={loading}>
            {loading ? "Thinking..." : "Send"}
          </SendButton>
        </InputContainer>
      </ChatContainer>
      <GraphicPlaceholder>Custom Graphic Here</GraphicPlaceholder>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background: #32643f;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #f9eccc;
  padding: 20px;
  position: relative;
`;

const Header = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const ChatContainer = styled.div`
  width: 80%;
  height: 60vh;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  backdrop-filter: blur(10px);
`;

const MessagesContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 10px;
`;

const Message = styled.div`
  background-color: ${({ sender }) => (sender === "user" ? "#2e8b57" : "#8fbc8f")};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  width: fit-content;
  max-width: 80%;
  align-self: ${({ sender }) => (sender === "user" ? "flex-end" : "flex-start")};
  color: white;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const SendButton = styled.button`
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #2e8b57;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background-color: #3cb371;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const GraphicPlaceholder = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.9rem;
`;

export default ChatWithSnaps;
