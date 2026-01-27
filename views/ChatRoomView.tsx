
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Send, Phone, MapPin } from 'lucide-react';
// Import User type for props
import { User } from '../types';

// Add interface for props to fix type error in App.tsx
interface ChatRoomViewProps {
  user: User;
}

const ChatRoomView: React.FC<ChatRoomViewProps> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const mockMessages = [
    { id: 1, text: "Bonjour, j'ai vu votre annonce pour le Studio à Bastos.", sender: 'user', time: '10:00' },
    { id: 2, text: "Bonjour ! Oui, il est toujours disponible pour des visites demain.", sender: 'owner', time: '10:05' },
    { id: 3, text: "Super, à quelle heure seriez-vous disponible ?", sender: 'user', time: '10:06' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="px-6 py-6 flex items-center justify-between border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?u=sam" className="w-10 h-10 rounded-full object-cover border-2 border-indigo-50" />
            <div>
              <h3 className="text-sm font-black text-gray-900">Samuel Eto'o</h3>
              <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div> En ligne
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 text-gray-400">
          <MoreVertical size={20} />
        </button>
      </header>

      {/* Property Context Bar */}
      <div className="bg-gray-50/50 px-6 py-3 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
           <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=100" className="w-8 h-8 rounded-lg object-cover" />
           <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter line-clamp-1">Appartement Luxe - Bastos</p>
        </div>
        <p className="text-[10px] font-black text-indigo-600">450k FCFA</p>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 hide-scrollbar">
        {mockMessages.map(msg => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-5 py-4 rounded-3xl text-sm font-medium shadow-sm ${
              msg.sender === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none shadow-indigo-100' 
                : 'bg-gray-100 text-gray-900 rounded-tl-none'
            }`}>
              <p>{msg.text}</p>
              <span className={`text-[8px] mt-2 block font-bold uppercase ${msg.sender === 'user' ? 'text-indigo-200' : 'text-gray-400'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-gray-50 flex items-center gap-3 pb-10">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Écrivez votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-6 pr-14 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 placeholder:text-gray-300 focus:ring-2 focus:ring-indigo-100 transition-all"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg active:scale-90 transition-all">
            <Send size={18} />
          </button>
        </div>
        <button className="p-4 bg-amber-500 text-white rounded-2xl shadow-xl shadow-amber-100 active:scale-90 transition-all">
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoomView;
