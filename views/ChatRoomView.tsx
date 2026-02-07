
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, MoreVertical, Send, Phone } from 'lucide-react';
import { User, Chat, Property } from '../types';

interface ChatRoomViewProps {
  user: User;
}

const ChatRoomView: React.FC<ChatRoomViewProps> = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [chatInfo, setChatInfo] = useState<Chat | null>(null);
  const [propertyInfo, setPropertyInfo] = useState<Property | null>(null);

  useEffect(() => {
    // Récupération des infos du chat et du logement associé
    const savedChats = JSON.parse(localStorage.getItem(`chats_${user.id}`) || '[]');
    const chat = savedChats.find((c: Chat) => c.id === id);
    if (chat) {
      setChatInfo(chat);
      const allProperties = JSON.parse(localStorage.getItem('houz_properties') || '[]');
      const prop = allProperties.find((p: Property) => p.id === chat.propertyId);
      if (prop) setPropertyInfo(prop);
    }
  }, [id, user.id]);

  const handleSend = () => {
    if (!message.trim()) return;
    // Logique d'envoi à implémenter avec Firebase
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="px-6 py-6 flex items-center justify-between border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand-blue/10 flex items-center justify-center text-brand-blue font-black">
              {propertyInfo ? propertyInfo.ownerName[0] : '?'}
            </div>
            <div>
              <h3 className="text-sm font-black text-gray-900">{propertyInfo?.ownerName || 'Destinataire'}</h3>
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

      {propertyInfo && (
        <div className="bg-gray-50/50 px-6 py-3 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3 overflow-hidden">
             <img src={propertyInfo.imageUrl} className="w-8 h-8 rounded-lg object-cover" />
             <p className="text-[10px] font-black text-gray-900 uppercase tracking-tighter truncate">{propertyInfo.title}</p>
          </div>
          <p className="text-[10px] font-black text-brand-orange whitespace-nowrap ml-4">{propertyInfo.price.toLocaleString()} FCFA</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6 hide-scrollbar">
        <div className="flex justify-start">
          <div className="max-w-[85%] px-5 py-4 bg-gray-100 text-gray-900 rounded-3xl rounded-tl-none text-sm font-medium">
             Bonjour ! Je suis le propriétaire. Comment puis-je vous aider pour ce logement ?
          </div>
        </div>
        {chatInfo?.lastMessage && chatInfo.lastMessage.startsWith('Bonjour, je suis') && (
          <div className="flex justify-end">
            <div className="max-w-[85%] px-5 py-4 bg-brand-blue text-white rounded-3xl rounded-tr-none text-sm font-medium shadow-xl shadow-brand-blue/10">
               {chatInfo.lastMessage}
            </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-white border-t border-gray-50 flex items-center gap-3 pb-10">
        <div className="flex-1 relative">
          <input 
            type="text" 
            placeholder="Écrivez votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-6 pr-14 py-4 bg-gray-50 border-none rounded-2xl text-sm font-bold text-gray-800 focus:ring-4 focus:ring-brand-blue/5 transition-all"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-brand-blue text-white rounded-xl shadow-lg active:scale-90 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
        <button className="p-4 bg-brand-orange text-white rounded-2xl shadow-xl shadow-brand-orange/20 active:scale-90 transition-all">
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatRoomView;
