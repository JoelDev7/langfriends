"use client";
import { useState } from "react";

export default function LanguageChatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  const [userMessage, setUserMessage] = useState("");

  async function askChatbot() {
    const requestBody = messagesToJsonString();
    if (!requestBody) {
      console.log("Unable to convert messages");
      return;
    }
    try {
      const answerRequest = await fetch("http://localhost:3000/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      if (!answerRequest.ok) {
        console.error(
          "There was a problem with the request",
          answerRequest.status,
        );
      }
      const answerResponse = await answerRequest.json();
      if (answerResponse.messages) {
        addNewMessage(answerResponse.messages, "assistant");
      }
    } catch (error) {
      console.error("Unable to complete chatbot request", error);
    }
  }

  function addNewMessage(message: string, role: "assistant" | "user") {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role, content: message },
    ]);
  }

  function addUserMessageToMessages() {
    addNewMessage(userMessage, "user");
  }

  function getChatbotAnswer() {
    if (userMessage) {
      addUserMessageToMessages();
      askChatbot();
      setUserMessage("");
    }
  }

  function messagesToJsonString() {
    try {
      return JSON.stringify({
        messages: [
          ...messages,
          { role: "user", content: userMessage },
          {
            role: "system",
            content:
              "Be a helpful English native speaker that gives concise answers and only talks about English learning related topics. Anwer only user role messages.",
          },
        ],
      });
    } catch (error) {
      console.log("Unable to convert current messages to json.");
      return null;
    }
  }
  return (
    <div className="flex flex-col">
      <ul>
        {messages.map((msg, i) => {
          return (
            <li key={msg.content + i}>
              <strong>{msg.role}:</strong>
              <br />
              {msg.content}
            </li>
          );
        })}
      </ul>
      <input
        onChange={(e) => setUserMessage(e.target.value)}
        value={userMessage}
        className="border-gray-500 px-2 py-1 border-b "
        type="text"
      />
      <button type="button" onClick={getChatbotAnswer}>
        Send message
      </button>
    </div>
  );
}
