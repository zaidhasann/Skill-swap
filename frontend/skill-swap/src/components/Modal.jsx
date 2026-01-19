export default function Modal({ children, open, onClose }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)",
      display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
    }}>
      <div style={{ background: "white", borderRadius: 8, padding: 20, width: "90%", maxWidth: 600, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", right: 12, top: 12, border: "none", background: "transparent", fontSize: 18 }}>✕</button>
        {children}
      </div>
    </div>
  );
}
