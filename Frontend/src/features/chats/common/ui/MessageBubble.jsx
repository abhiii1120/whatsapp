export default function MessageBubble({ msg, isMe }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
          isMe
            ? "bg-emerald-600 text-white rounded-br-sm"
            : "bg-[#1c1f26] text-gray-100 rounded-bl-sm"
        }`}
      >
        <p>{msg.content}</p>
        <div
          className={`text-[10px] mt-1 flex items-center gap-1 justify-end ${
            isMe ? "text-emerald-100/70" : "text-gray-500"
          }`}
        >
          {msg.timestamp}
        </div>
      </div>
    </div>
  );
}