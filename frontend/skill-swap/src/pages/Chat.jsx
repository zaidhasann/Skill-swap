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
  const [requestDetails, setRequestDetails] = useState(null);

  useEffect(() => {
    if (!user || socketRef.current) return;

    API.get(`/requests/${requestId}`)
      .then((res) => {
        setRequestDetails(res.data?.request || res.data);
        const socket = io("http://localhost:5000", {
          auth: {
            token: sessionStorage.getItem("token"),
          },
        });

        socketRef.current = socket;
        socket.emit("joinRoom", requestId);

        const receiveHandler = (msg) => {
          if (!msg?.text || !msg?.sender) return;

          setMessages((prev) => {
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
        alert("You are not authorized to access this exchange room");
        navigate("/dashboard");
      });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [requestId, user, navigate]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!text.trim() || !socketRef.current) return;

    const message = {
      sender: user._id,
      text: text.trim(),
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
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span>Skill Exchange Coordination</span>
            {requestDetails?.skill?.title && (
              <span style={{ color: "var(--color-text-muted)" }}>• {requestDetails.skill.title}</span>
            )}
          </div>
          <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontWeight: 400 }}>
            Active direct channel between exchange partners
          </span>
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="btn-ghost"
          style={{ fontSize: "0.8125rem", padding: "0.35rem 0.65rem" }}
        >
          ← Dashboard
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div style={{ textAlign: "center", margin: "auto", color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
            🤝 Begin your exchange conversation by coordinating schedules and preferred formats.
          </div>
        ) : (
          messages.map((m, i) => (
            <div
              key={i}
              className={`message-row ${
                m.sender === user._id ? "sent" : "received"
              }`}
            >
              <div
                className={`message-bubble ${
                  m.sender === user._id ? "message-sent" : "message-received"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))
        )}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Write a message to your exchange partner..."
        />
        <button
          className="chat-send-btn"
          onClick={sendMessage}
          aria-label="Send message"
        >
          ➤
        </button>
      </div>
    </section>
  );
}

