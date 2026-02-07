
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, Search, MessageSquare } from 'lucide-react';
import { User, Chat } from '../types';

interface MessageCenterViewProps {
  user: User;
}

const MessageCenterView: React.FC<MessageCenterViewProps> = ({ user }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chat[]>([]);

  // Dans une vraie app, on chargerait les chats depuis Firebase ici
  useEffect(() => {
    const savedChats = localStorage.getItem(`chats_${user.id}`);
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, [user.id]);

  return (
    <div className="px-6 py-8 bg-white min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-brand-blue tracking-tighter">Messages</h1>
        <button className="p-2 bg-gray-50 rounded-xl text-gray-400"><MoreVertical size={20} /></button>
      </header>

      {chats.length > 0 ? (
        <div className="space-y-2">
          {chats.map(chat => (
            <div 
              key={chat.id}
              onClick={() => navigate(`/chat/${chat.id}`)}
              className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-3xl transition-all cursor-pointer border border-transparent hover:border-gray-100"
            >
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 font-black">
                {chat.id.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-gray-900 truncate">Conversation #{chat.id.substring(0, 4)}</h3>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Auj.</span>
                </div>
                <p className="text-xs text-gray-500 truncate font-medium">{chat.lastMessage || "Démarrez la discussion..."}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-200 mb-6">
            <MessageSquare size={40} />
          </div>
          <h2 className="text-xl font-black text-brand-blue mb-2">Aucun message</h2>
          <p className="text-xs text-gray-400 px-10 font-medium">Vos conversations avec les bailleurs apparaîtront ici dès que vous les contactez.</p>
        </div>
      )}
    </div>
  );
};

export default MessageCenterView;
