import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const chatWithGPT3 = async userInput => {
    const apiEndpoint = 'https://api.cohere.ai/v1/chat';
    const headers = {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    };

    const data = {
      chat_history: [
        {
          role: 'Admin',
          message: 'This explanation is for you chatbot. you are an expert friend trying to help find a way to go shopping',
        },
      ],
      message: userInput,
      connectors: [{ id: 'web-search' }],
    };
    try {
      const response = await axios.post(apiEndpoint, data, { headers });
      console.log('test:');
      console.log(JSON.stringify(response.data));
      return response.data.text;
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
      return '';
    }
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    const response = await chatWithGPT3(input);
    const newAiMessage = { text: response, user: false };
    setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);
    setInput('');
  };
  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.user ? 'user-message' : 'ai-message'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form className="chatbot-input-form" onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Type your message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};
export default Chatbot;
