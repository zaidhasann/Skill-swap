export default function Avatar({ name, size = 60 }) {
  const initials = name
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#4f46e5",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: size / 2.5,
      }}
    >
      {initials}
    </div>
  );
}
