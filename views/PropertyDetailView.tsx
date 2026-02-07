
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Share2, MapPin, 
  MessageCircle, Phone, CheckCircle2,
  Navigation, Bed, Ruler, CreditCard, Lock
} from 'lucide-react';
import { Property, User } from '../types';

interface PropertyDetailViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  user: User;
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ properties, favorites, onToggleFavorite, user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);

  if (!property) return <div>Chargement...</div>;

  const handleRent = () => {
    if (!user.isVerified) {
      alert("Vérifiez votre compte dans votre profil pour pouvoir louer ce bien !");
      navigate('/profile');
    } else {
      navigate(`/payment?amount=${property.price}`);
    }
  };

  return (
    <div className="bg-white min-h-screen relative pb-32">
      <div className="relative h-[45vh] overflow-hidden rounded-b-[3.5rem] shadow-2xl">
        <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        <div className="absolute top-8 left-6 right-6 flex justify-between">
          <button onClick={() => navigate(-1)} className="p-2.5 bg-white/90 backdrop-blur rounded-2xl shadow-xl text-gray-900"><ChevronLeft size={24} /></button>
          <button onClick={() => onToggleFavorite(property.id)} className={`p-2.5 bg-white/90 backdrop-blur rounded-2xl shadow-xl ${favorites.includes(property.id) ? 'text-amber-500' : 'text-gray-900'}`}><Heart size={24} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} /></button>
        </div>
        
        {property.isRented && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[2px]">
             <div className="bg-orange-500 text-white font-black px-8 py-4 rounded-[2rem] shadow-2xl animate-in zoom-in duration-300 uppercase tracking-widest">
                Déjà Loué
             </div>
          </div>
        )}
      </div>

      <div className="px-6 py-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex items-center gap-2 text-blue-600 mb-1"><MapPin size={14} className="fill-current" /><span className="text-[10px] font-black uppercase tracking-widest">{property.neighborhood}</span></div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter leading-tight">{property.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-orange-500">{property.price.toLocaleString()} €</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Par mois</p>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Description</h3>
          <p className="text-gray-500 font-medium leading-relaxed text-sm">{property.description}</p>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[2rem] mb-12 border border-gray-100">
          <img src={property.ownerAvatar || "https://i.pravatar.cc/100"} className="w-16 h-16 rounded-[1.5rem] object-cover" />
          <div className="flex-1">
            <h4 className="font-black text-gray-900 tracking-tighter">{property.ownerName}</h4>
            <div className="flex items-center gap-1 text-blue-500"><CheckCircle2 size={12} /><span className="text-[10px] font-bold uppercase tracking-tighter">Bailleur Certifié</span></div>
          </div>
          <button className="p-4 bg-white text-blue-600 rounded-2xl shadow-sm border border-gray-100"><Phone size={20} /></button>
        </div>
      </div>

      {!property.isRented && (
        <div className="fixed bottom-10 left-6 right-6 z-[100] flex gap-3">
          <button onClick={() => navigate(`/chat/${property.id}`)} className="flex-1 bg-white border-2 border-[#0056b3] text-[#0056b3] font-black py-5 rounded-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase">
            <MessageCircle size={20} /> Chat
          </button>
          <button 
            onClick={handleRent} 
            className={`flex-[2] font-black py-5 rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase ${user.isVerified ? 'bg-orange-500 text-white shadow-orange-200' : 'bg-gray-100 text-gray-400 shadow-none'}`}
          >
            {!user.isVerified && <Lock size={18} />}
            <CreditCard size={20} /> Louer
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailView;
