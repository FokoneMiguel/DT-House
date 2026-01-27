
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Search, MoreVertical } from 'lucide-react';
import { User } from '../types';

interface MessageCenterViewProps {
  user: User;
}

const MessageCenterView: React.FC<MessageCenterViewProps> = ({ user }) => {
  const navigate = useNavigate();
  
  const mockChats = [
    { id: 'c1', name: 'Samuel Eto\'o', lastMsg: 'Bonjour, l\'appartement de Bastos est-il disponible ?', time: '12:30', unread: 2, avatar: 'https://i.pravatar.cc/150?u=sam' },
    { id: 'c2', name: 'Nathalie Koah', lastMsg: 'Le paiement de la commission a été validé.', time: 'Hier', unread: 0, avatar: 'https://i.pravatar.cc/150?u=nath' },
  ];

  return (
    <div className="px-6 py-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-gray-900 tracking-tighter">Messages</h1>
        <button className="p-2 bg-gray-50 rounded-xl"><MoreVertical size={20} /></button>
      </header>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
        <input 
          type="text" 
          placeholder="Rechercher une conversation..." 
          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-sm font-medium focus:ring-2 focus:ring-indigo-500 transition-all"
        />
      </div>

      <div className="space-y-2">
        {mockChats.map(chat => (
          <div 
            key={chat.id}
            onClick={() => navigate(`/chat/${chat.id}`)}
            className="flex items-center gap-4 p-4 hover:bg-indigo-50/50 rounded-3xl transition-colors cursor-pointer group"
          >
            <div className="relative">
              <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-2xl object-cover shadow-sm" />
              {chat.unread > 0 && (
                <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {chat.unread}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-bold text-gray-900 truncate">{chat.name}</h3>
                <span className="text-[10px] font-bold text-gray-400 uppercase">{chat.time}</span>
              </div>
              <p className="text-xs text-gray-500 truncate font-medium">{chat.lastMsg}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageCenterView;
