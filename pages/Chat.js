import React, { useState } from 'react';
import styled from 'styled-components';

const ChatWithSnaps = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (input.trim() === "") return;
    
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // Simulating Snaps' response (Replace with actual API call to OpenAI ChatGPT)
    const snapsResponse = { sender: "snaps", text: "Thinking..." };
    setMessages([...messages, userMessage, snapsResponse]);
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
          <SendButton onClick={handleSendMessage}>Send</SendButton>
        </InputContainer>
      </ChatContainer>
      <GraphicPlaceholder>Custom Graphic Here</GraphicPlaceholder>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background: linear-gradient(to bottom right, #0b3d02, #1a5e20);
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
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
