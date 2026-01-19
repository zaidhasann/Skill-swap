import { useEffect } from "react";

export default function Notification({ message, onClose, duration = 2500 }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [message, duration, onClose]);

  if (!message) return null;
  return (
    <div style={{
      position: "fixed", right: 20, top: 20, background: "#222", color: "white",
      padding: "0.6rem 1rem", borderRadius: 8, zIndex: 1200
    }}>
      {message}
    </div>
  );
}
