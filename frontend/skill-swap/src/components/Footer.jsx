export default function Footer() {
  return (
    <footer style={{
      background: "#f1f5ff",
      textAlign: "center",
      padding: "1rem",
      marginTop: "2rem"
    }}>
      <small>© {new Date().getFullYear()} SkillSwap • Built with ❤️</small>
    </footer>
  );
}
