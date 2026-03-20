export default function Message({ msg }) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.text}
    </div>
  );
}