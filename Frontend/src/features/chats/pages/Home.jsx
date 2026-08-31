import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Mic,
  Smile,
} from "lucide-react";
import ChatListItem from "../common/ui/ChatListItem";
import SidebarNav from "../common/ui/SidebarNav";
import Avatar from "../common/ui/Avatar";
import MessageBubble from "../common/ui/MessageBubble";
import FileAttachment from "../common/ui/FileAttachment";
import { useSelector } from "react-redux";
import useChat from "../hooks/useChat";
import EmptyState from "../common/ui/EmptyState";

const chats = [
  {
    id: 1,
    name: "Sarah Jenkins",
    avatar: "https://i.pravatar.cc/100?img=47",
    preview: "The quarterly report looks solid. Let's review...",
    time: "10:42 AM",
    active: true,
    online: true,
  },
  {
    id: 2,
    name: "Design Team",
    avatar: "https://i.pravatar.cc/100?img=12",
    preview: "New mockups for the dashboard are re...",
    time: "09:15 AM",
    active: false,
    online: true,
    isGroup: true,
  },
  {
    id: 3,
    name: "Project Alpha",
    avatar: null,
    preview: "Deployment successful across all regions.",
    time: "Yesterday",
    active: false,
    online: false,
    isSystem: true,
  },
];

const messages = [
  {
    id: 1,
    fromMe: false,
    text: "Hey, are we still on for the review meeting this afternoon?",
    time: "10:30 AM",
  },
  {
    id: 2,
    fromMe: false,
    text: "I've got the updated metrics ready.",
    time: "10:31 AM",
  },
  {
    id: 3,
    fromMe: true,
    text: "Yes, absolutely. Let's aim for 2 PM.",
    time: "10:35 AM",
  },
  {
    id: 4,
    fromMe: true,
    text: "Could you send over the raw data beforehand? I want to take a quick look before we jump on the call.",
    time: "10:36 AM",
  },
];

export default function ChatDashboard() {
  const [activeChat, setActiveChat] = useState(null); // the clicked chat object itself, or null
  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [message, setMessage] = useState("");
  const currentUser = useSelector((state) => state.auth.user);
  const searchUserResult = useSelector((state) => state.chat.searchUserResult);
  const { handleSearchUser } = useChat();
  let [searchQuery, setSearchQuery] = useState("");
  let [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!searchQuery.trim()) return;
    const delayDebounce = setTimeout(async () => {
      setIsSearching(true);
      try {
        handleSearchUser(searchQuery);
      } catch (error) {
        console.error("Error while searching users on backend:", error);
      } finally {
        setIsSearching(false);
      }
    }, 350);
    return () => clearTimeout(delayDebounce);
  }, [searchQuery, currentUser]);

  const openChat = (chat) => {
    setActiveChat(chat);
    setShowChatOnMobile(true);
  };

  const closeChat = () => {
    setShowChatOnMobile(false);
    // if you want mobile "back" to fully deselect too, uncomment:
    // setActiveChat(null);
  };

  return (
    <div className="h-screen w-full bg-[#111318] text-gray-100 flex flex-col overflow-hidden font-sans">
      <div className="flex flex-1 min-h-0">
        <aside
          className={`w-full md:w-[320px] lg:w-90 shrink-0 h-full border-r border-white/5 flex-col bg-[#111318] ${
            showChatOnMobile ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 shrink-0">
            <div>
              <h1 className="text-lg font-semibold text-emerald-400">Chats</h1>
              <p className="text-xs text-gray-500">Recent conversations</p>
            </div>
            <button className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-emerald-400 hover:bg-white/5">
              <Plus size={16} />
            </button>
          </div>

          <div className="px-4 pb-3 shrink-0">
            <div className="flex items-center gap-2 bg-[#1c1f26] rounded-lg px-3 py-2">
              <Search size={15} className="text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-sm text-gray-200 placeholder:text-gray-500 outline-none w-full"
              />
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto">
            {searchUserResult.map((chat) => (
              <ChatListItem
                key={chat._id}
                chat={chat}
                selected={activeChat?._id === chat._id}
                onClick={() => openChat(chat)}
              />
            ))}
          </div>

          <SidebarNav />
        </aside>

        {/* Chat panel */}
        <section
          className={`flex-1 min-w-0 flex-col bg-[#15171d] ${
            showChatOnMobile ? "flex" : "hidden md:flex"
          }`}
        >
          {activeChat ? (
            <>
              {/* Chat header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <button onClick={closeChat} className="md:hidden text-gray-400 mr-1">
                    ←
                  </button>
                  <Avatar
                    src={activeChat.avatar}
                    alt={activeChat.username}
                    name={activeChat.username}
                    size={38}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-100 truncate">
                      {activeChat.username}
                    </p>
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-5 text-gray-400 shrink-0">
                  <Video size={17} className="cursor-pointer hover:text-gray-200" />
                  <Phone size={16} className="cursor-pointer hover:text-gray-200" />
                  <Search size={16} className="cursor-pointer hover:text-gray-200 hidden sm:block" />
                  <MoreVertical size={16} className="cursor-pointer hover:text-gray-200" />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
                <div className="flex justify-center">
                  <span className="text-[11px] text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                {messages.map((m) => (
                  <MessageBubble key={m.id} msg={m} />
                ))}
                <FileAttachment />
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-3 border-t border-white/5 shrink-0">
                <button className="text-gray-400 hover:text-gray-200 shrink-0">
                  <Plus size={20} />
                </button>
                <button className="text-gray-400 hover:text-gray-200 shrink-0 hidden sm:block">
                  <Smile size={19} />
                </button>
                <div className="flex-1 bg-[#1c1f26] rounded-full px-4 py-2.5 flex items-center min-w-0">
                  <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder="Type a message..."
                    className="bg-transparent text-sm text-gray-200 placeholder:text-gray-500 outline-none w-full"
                  />
                  <Paperclip size={16} className="text-gray-500 shrink-0 ml-2" />
                </div>
                <button className="w-10 h-10 rounded-full bg-emerald-600 hover:bg-emerald-500 flex items-center justify-center shrink-0">
                  <Mic size={17} className="text-white" />
                </button>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </section>
      </div>
    </div>
  );
}