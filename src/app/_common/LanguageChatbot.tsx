"use client";
import { useEffect, useState } from "react";

export default function LanguageChatbot() {
  const [messages, setMessages] = useState([
    {
      role: "system",
      content:
        "Be a helpful English native speaker that gives concise answers and only talks about Englsih learning related topics. Anwer only user role messages.",
    },
    { role: "user", content: "Hello" },
  ]);

  async function askChatbot() {
    const answerRequest = await fetch("http://localhost:3000/api/chatbot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: messagesToJsonString(),
    });
    const answerResponse = await answerRequest.json();
    let newMessages = [...messages];
    console.log(answerResponse.messages);
    newMessages.push({ role: "assistant", content: answerResponse.messages });
    setMessages(newMessages);
  }

  function messagesToJsonString() {
    let messagesToSend;
    try {
      messagesToSend = JSON.stringify({ messages });
    } catch (error) {
      console.log("Unable to convert current messages to json.");
      return null;
    }
    return messagesToSend;
  }
  return (
    <div className="flex flex-col bg-red-100">
      <button onClick={askChatbot}>Send message</button>
      <ul>
        {messages.map((msg) => {
          return (
            <li>
              {msg.role}
              <br />
              {msg.content}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
