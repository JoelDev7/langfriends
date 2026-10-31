"use client";
import { useEffect, useRef, useState } from "react";
import FormButton from "./FormButton";
import Popover from "./Popover";

type Popover = {
  show: boolean;
  message: string;
  type: "success" | "error" | "info" | "";
  durationMils: number;
};

export default function LanguageChatbot() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [],
  );

  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [popover, setPopover] = useState<Popover>({
    show: false,
    message: "",
    type: "",
    durationMils: 0,
  });

  async function askChatbot() {
    const requestBody = messagesToJsonString();
    if (!requestBody) {
      console.log("Messages array is empty or has the wrong format.");
      setPopover({
        durationMils: 4500,
        message: "There are no messages or they have the wrong format",
        show: true,
        type: "error",
      });
      return;
    }
    try {
      const answerRequest = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      if (!answerRequest.ok) {
        console.error(
          "There was a problem with chatbot's api response check errors and internet connection.",
          answerRequest.status,
        );
        setPopover({
          durationMils: 4500,
          message: "Please check your internet connection and try again",
          show: true,
          type: "error",
        });
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

  function showLatestMessages() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    showLatestMessages();
  }, [messages]);

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
      setPopover({
        durationMils: 4500,
        message: "There was a problem preparing messages for the chatbot.",
        show: true,
        type: "error",
      });
      return null;
    }
  }
  return (
    <div className="mx-2 w-full py-2 relative h-full">
      <ul className="overflow-y-scroll h-full pb-11 flex flex-col justify-end">
        {messages.map((msg, i) => {
          return (
            <li
              className={`${msg.role === "assistant" ? "bg-emerald-100" : "bg-blue-200"} rounded-xl p-2 ${msg.role === "assistant" ? "rounded-tl-none" : "rounded-tr-none "} ${msg.role == "assistant" ? "" : "text-right"} ${msg.role === "assistant" ? "self-start" : "self-end"} mb-2 `}
              key={msg.content + i}
            >
              {msg.content}
            </li>
          );
        })}
        <div ref={messagesEndRef} />
      </ul>
      <form
        className="flex w-full absolute bottom-0 bg-white p-1 rounded"
        onSubmit={(e) => getChatbotAnswer(e)}
      >
        <input
          name="chatInput"
          aria-label="
            Chat Input"
          onChange={(e) => setUserMessage(e.target.value)}
          value={userMessage}
          className="border-gray-500 px-2 border-b grow"
          type="text"
        />
        <FormButton text="Send message" styles="px-2 " />
      </form>
      <Popover
        onClose={() =>
          setPopover({
            message: "",
            show: false,
            type: "",
            durationMils: 0,
          })
        }
        durationMils={popover.durationMils}
        message={popover.message}
        showPopover={popover.show}
        type={popover.type}
      />
    </div>
  );
}
