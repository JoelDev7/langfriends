"use client";
import { useState } from "react";
import FormButton from "./FormButton";

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

  function getChatbotAnswer(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
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
              "Be a helpful English native speaker that gives concise and not long answers and helps users improve their English through conversation, examples and other teaching tools. Anwer only user role messages.",
          },
        ],
      });
    } catch (error) {
      console.log("Unable to convert current messages to json.");
      return null;
    }
  }
  return (
    <div className="flex flex-col mx-2 w-full h-full py-2">
      <ul className="">
        {messages.map((msg, i) => {
          return (
            <li
              className={`${msg.role === "assistant" ? "bg-emerald-100" : "bg-blue-200"} rounded-xl p-2 ${msg.role === "assistant" ? "rounded-tl-none" : "rounded-tr-none "} ${msg.role == "assistant" ? "" : "text-right"} mb-2`}
              key={msg.content + i}
            >
              {msg.content}
            </li>
          );
        })}
      </ul>
      <form className="flex w-full" onSubmit={(e) => getChatbotAnswer(e)}>
        <input
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
          className="border-gray-500 px-2 border-b grow-[1]"
          type="text"
        />
        <FormButton text="Send message" styles="px-2 " />
      </form>
    </div>
  );
}
