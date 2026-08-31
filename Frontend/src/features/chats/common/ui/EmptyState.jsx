import { MessageSquare } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
        <MessageSquare size={28} className="text-gray-500" />
      </div>
      <p className="text-gray-300 font-medium">No chat selected</p>
      <p className="text-sm text-gray-500 mt-1">
        Tap a conversation on the left to start viewing messages.
      </p>
    </div>
  );
}