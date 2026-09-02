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
import { useSelector } from "react-redux";
import useChat from "../hooks/useChat";
import EmptyState from "../common/ui/EmptyState";

const getChatId = (chat) => chat?._id || chat?.id;

export default function ChatDashboard() {
  const currentUser = useSelector((state) => state.auth.user);
  const searchUserResult = useSelector((state) => state.chat.searchUserResult);
  const conversations = useSelector((state) => state.chat.conversations);
  const user = useSelector((state) => state.auth.user);
  const activeConversation = useSelector(
    (state) => state.chat.activeConversation,
  );
  
  const messages = useSelector(
    (state) => state.chat.messages[activeConversation] || [],
  );
  const {
    handleSearchUser,
    handleSetActiveConversation,
    createSocketConnection,
    handleCreateConversation,
    handleGetMyConversation,
    handleSendChatMessage,
  } = useChat();

  const [showChatOnMobile, setShowChatOnMobile] = useState(false);
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    createSocketConnection();
    handleGetMyConversation();
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
  console.log(activeConversation, "activechat");

  const handleSelectSearchResult = async (user) => {
    console.log(currentUser);
    if (user._id === currentUser.id) {
      return;
    }
    await handleCreateConversation(user._id);
    setShowChatOnMobile(true);
    setSearchQuery("");
  };

  const handleOpenConversation = (conv) => {
    handleSetActiveConversation(conv._id);
    setShowChatOnMobile(true);
  };

  const handleSendMessage = (e) => {
    let messageObj = {
      id: Date.now(),
      senderId: user.id || user.id,
      receiver: activeChat?.recipientId,
      content: message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessage("");
    handleSendChatMessage(messageObj, activeConversation);
  };

  const closeChat = () => setShowChatOnMobile(false);

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

          <div className="flex-1 min-h-0 overflow-y-auto divide-y divide-white/5">
            {/* Search results — only when searching */}
            {searchQuery.trim() !== "" && (
              <div>
                <div className="px-4 py-2 bg-white/5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  {isSearching ? "Searching..." : "Users"}
                </div>
                {searchUserResult.length === 0 && !isSearching && (
                  <div className="px-4 py-4 text-xs text-gray-500 italic">
                    No users match "{searchQuery}"
                  </div>
                )}
                {searchUserResult.map((user) => (
                  <ChatListItem
                    key={user._id}
                    chat={user}
                    selected={false}
                    onClick={() => handleSelectSearchResult(user)}
                  />
                ))}
              </div>
            )}

            {/* Existing conversations */}
            <div>
              {searchQuery.trim() !== "" && (
                <div className="px-4 py-2 bg-white/5 text-[10px] uppercase font-bold tracking-wider text-gray-500">
                  Conversations
                </div>
              )}
              {conversations.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500 text-sm">
                  No conversations yet.
                </div>
              ) : (
                conversations.map((conv) => (
                  <ChatListItem
                    key={conv._id}
                    chat={conv}
                    selected={conv._id === activeConversation}
                    onClick={() => handleOpenConversation(conv)}
                  />
                ))
              )}
            </div>
          </div>

          <SidebarNav />
        </aside>

        {/* Chat panel — unchanged below */}
        <section
          className={`flex-1 min-w-0 flex-col bg-[#15171d] ${
            showChatOnMobile ? "flex" : "hidden md:flex"
          }`}
        >
          {activeChat ? (
            <>
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

              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 space-y-3">
                <div className="flex justify-center">
                  <span className="text-[11px] text-gray-500 bg-white/5 px-3 py-1 rounded-full">
                    Today
                  </span>
                </div>
                {messages.map((m, i) => (
                  <MessageBubble key={i} msg={m} />
                ))}
              </div>

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
                      if (e.key === "Enter") handleSendMessage();
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
