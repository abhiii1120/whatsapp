import { Circle, Hash, MessageSquare, Users } from "lucide-react";

export default function SidebarNav() {
  const items = [
    { icon: MessageSquare, label: "Chats", active: true },
    { icon: Circle, label: "Status" },
    { icon: Users, label: "Channels" },
    { icon: Hash, label: "Communities" },
  ];
  return (
    <nav className="shrink-0 flex items-center justify-around border-t border-white/5 bg-[#0c0d11] px-2 py-2">
      {items.map(({ icon: Icon, label, active }) => (
        <button
          key={label}
          className={`flex flex-col items-center gap-1 px-3 py-1 text-[10px] ${
            active ? "text-emerald-400" : "text-gray-500"
          }`}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}
    </nav>
  );
}