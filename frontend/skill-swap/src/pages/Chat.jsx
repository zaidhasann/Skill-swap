import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "./Chat.css";


export default function Chat() {
  const { user } = useAuth();
  const { requestId } = useParams();
  const navigate = useNavigate();

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user || socketRef.current) return; // 🔑 PREVENT RECONNECT

    API.get(`/requests/${requestId}`)
      .then(() => {
        const socket = io("http://localhost:5000", {
          auth: {
            token: sessionStorage.getItem("token"), // ✅ sessionStorage ok
          },
        });

        socketRef.current = socket;
        socket.emit("joinRoom", requestId);

        const receiveHandler = (msg) => {
          if (!msg?.text || !msg?.sender) return;

          setMessages((prev) => {
            // ❌ prevent duplicate push
            if (
              prev.length &&
              prev[prev.length - 1].text === msg.text &&
              prev[prev.length - 1].sender === msg.sender
            ) {
              return prev;
            }
            return [...prev, msg];
          });
        };

        socket.on("receiveMessage", receiveHandler);

        socket.on("connect_error", () => {
          alert("Socket connection failed");
          navigate("/dashboard");
        });
      })
      .catch(() => {
        alert("You are not allowed to access this chat");
        navigate("/dashboard");
      });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [requestId, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !socketRef.current) return;

    const message = {
      sender: user._id,
      text,
      createdAt: new Date().toISOString(),
    };

    socketRef.current.emit("sendMessage", {
      roomId: requestId,
      message,
    });

    setMessages((prev) => [...prev, message]);
    setText("");
  };

  return (
    <section className="chat-container">
      <div className="chat-header">
        Skill Chat
      </div>

      <div className="chat-messages">
       {messages.map((m, i) => (
      <div
        key={i}
        className={`message-row ${
          m.sender === user._id ? "sent" : "received"
        }`}>
            <div
          className={`message-bubble ${
            m.sender === user._id
              ? "message-sent"
              : "message-received"
          }`}
        >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message..."
        />
        <button className="chat-send-btn"
          onClick={sendMessage}
          
        >
          ➤
        </button>
      </div>
    </section>
  );
}
