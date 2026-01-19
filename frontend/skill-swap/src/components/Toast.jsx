export default function Toast({ message, type }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        padding: "12px 18px",
        background: type === "error" ? "#dc2626" : "#16a34a",
        color: "#fff",
        borderRadius: 6,
        fontSize: 14,
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
}
