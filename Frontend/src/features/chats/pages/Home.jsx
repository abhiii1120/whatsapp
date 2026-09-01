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

// Helper: normalize id across search results (_id) and conversation objects (id)
const getChatId = (chat) => chat?._id || chat?.id;



export default function ChatDashboard() {
  const currentUser = useSelector((state) => state.auth.user);
  const searchUserResult = useSelector((state) => state.chat.searchUserResult);
  const conversations = useSelector((state) => state.chat.conversations);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation,
  );

  const {
    handleSearchUser,
    handleAppendConversation,
    handleSetActiveConversation,
    createSocketConnection,
  } = useChat();

  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
  {
    fromMe: false,
    text: "Hey, are we still on for the review meeting this afternoon?",
    time: "10:30 AM",
  },
  {
    fromMe: false,
    text: "I've got the updated metrics ready.",
    time: "10:31 AM",
  },
  {
    fromMe: true,
    text: "Yes, absolutely. Let's aim for 2 PM.",
    time: "10:35 AM",
  },
  {
    fromMe: true,
    text: "Could you send over the raw data beforehand? I want to take a quick look before we jump on the call.",
    time: "10:36 AM",
  },
]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    createSocketConnection();
  }, []);

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

  const activeChat =
    conversations.find((c) => getChatId(c) === activeConversation) || null;

  const listToShow = searchQuery.trim() ? searchUserResult : conversations;

  const openChat = (chat) => {
    const conversationId = getChatId(chat);
    const exists = conversations.some((c) => getChatId(c) === conversationId);

    if (!exists) {
      const newConv = {
        id: conversationId,
        username: chat.username,
        email: chat.email,
        avatar: chat.avatar,
        lastMessage: "Tap to start talking",
        timeStamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        unread: false,
      };
      handleAppendConversation(newConv);
    }

    handleSetActiveConversation(conversationId);
    setShowChatOnMobile(true);
    setSearchQuery("");
  };

  const handleSendMessage = (e) => {
    let messageObj = {
      fromMe: true,
      text: message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages,messageObj])
    setMessage('')
  };

  const closeChat = () => {
    setShowChatOnMobile(false);
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
            {listToShow.map((chat) => (
              <ChatListItem
                key={getChatId(chat)}
                chat={chat}
                selected={getChatId(chat) === activeConversation}
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
                  <button
                    onClick={closeChat}
                    className="md:hidden text-gray-400 mr-1"
                  >
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
                  <Video
                    size={17}
                    className="cursor-pointer hover:text-gray-200"
                  />
                  <Phone
                    size={16}
                    className="cursor-pointer hover:text-gray-200"
                  />
                  <Search
                    size={16}
                    className="cursor-pointer hover:text-gray-200 hidden sm:block"
                  />
                  <MoreVertical
                    size={16}
                    className="cursor-pointer hover:text-gray-200"
                  />
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
                <div className="flex justify-center">
                  <span className="text-[11px] text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                {messages.map((m, i) => (
                  <MessageBubble key={i} msg={m} />
                ))}
                {/* <FileAttachment /> */}
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    placeholder="Type a message..."
                    className="bg-transparent text-sm text-gray-200 placeholder:text-gray-500 outline-none w-full"
                  />
                  <Paperclip
                    size={16}
                    className="text-gray-500 shrink-0 ml-2"
                  />
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
