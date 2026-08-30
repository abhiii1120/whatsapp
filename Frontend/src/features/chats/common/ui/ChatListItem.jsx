import { LayoutGrid } from "lucide-react";
import Avatar from "./Avatar";

export default function ChatListItem({ chat, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-l-2 ${
        selected
          ? "bg-white/5 border-emerald-400"
          : "border-transparent hover:bg-white/3"
      }`}
    >
      {chat.isSystem ? (
        <div className="w-10 h-10 rounded-full bg-sky-500/15 flex items-center justify-center shrink-0">
          <LayoutGrid size={18} className="text-sky-400" />
        </div>
      ) : (
        <Avatar src={chat.avatar} alt={chat.name} online={chat.online} />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-sm font-medium text-gray-100 truncate">
            {chat.name}
          </span>
          <span className="text-[11px] text-gray-500 shrink-0">
            {chat.time}
          </span>
        </div>
        <p className="text-xs text-gray-500 truncate mt-0.5">{chat.preview}</p>
      </div>
    </button>
  );
}