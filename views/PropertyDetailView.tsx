
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Share2, MapPin, 
  MessageCircle, Phone, Sparkles, CheckCircle2,
  Navigation, Info, Sofa, Ruler, Bed, Search
} from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const PropertyDetailView: React.FC<PropertyDetailViewProps> = ({ properties, favorites, onToggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!property) return <div>Chargement...</div>;

  return (
    <div className="bg-white min-h-screen relative pb-32">
      {/* Header Image Section */}
      <div className="relative h-[45vh] overflow-hidden rounded-b-[3.5rem] shadow-2xl">
        <img src={property.images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>
        
        <div className="absolute top-8 left-6 right-6 flex justify-between">
          <button onClick={() => navigate(-1)} className="p-2.5 bg-white/90 backdrop-blur rounded-2xl shadow-xl text-gray-900">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-3">
            <button className="p-2.5 bg-white/90 backdrop-blur rounded-2xl shadow-xl text-gray-900">
              <Share2 size={24} />
            </button>
            <button 
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2.5 bg-white/90 backdrop-blur rounded-2xl shadow-xl ${favorites.includes(property.id) ? 'text-amber-500' : 'text-gray-900'}`}
            >
              <Heart size={24} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 right-6 flex justify-between items-end">
           <div className="flex gap-2">
             {property.images.map((_, i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all ${activeImage === i ? 'w-8 bg-white' : 'w-2 bg-white/50'}`} />
             ))}
           </div>
           <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-xl">
              <span className="text-xs font-black text-gray-900">{property.type}</span>
           </div>
        </div>
      </div>

      <div className="px-6 py-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 text-indigo-600 mb-1">
               <MapPin size={14} className="fill-current" />
               <span className="text-[10px] font-black uppercase tracking-widest">{property.neighborhood}</span>
            </div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tighter leading-tight mb-2">{property.title}</h1>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-amber-500">{property.price.toLocaleString()} FCFA</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Par mois</p>
          </div>
        </div>

        {/* Feature Grid like the Results view but detailed */}
        <div className="grid grid-cols-2 gap-3 mb-10">
          <div className="bg-gray-50 p-5 rounded-[2rem] flex items-center gap-4">
             <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm"><Bed size={20} /></div>
             <div>
               <p className="text-[8px] font-black text-gray-400 uppercase">Pièces</p>
               <p className="text-sm font-black text-gray-900 tracking-tighter">2 pièces</p>
             </div>
          </div>
          <div className="bg-gray-50 p-5 rounded-[2rem] flex items-center gap-4">
             <div className="p-3 bg-white rounded-2xl text-indigo-600 shadow-sm"><Ruler size={20} /></div>
             <div>
               <p className="text-[8px] font-black text-gray-400 uppercase">Surface</p>
               <p className="text-sm font-black text-gray-900 tracking-tighter">55 m²</p>
             </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Description</h3>
          <p className="text-gray-500 font-medium leading-relaxed text-sm">
            {property.description}
          </p>
        </div>

        {/* Local Insights Map/Area card */}
        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white mb-12 relative overflow-hidden group">
           <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800" className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-1000" />
           <div className="relative z-10">
              <h4 className="text-lg font-black mb-2 tracking-tight">Vivre à {property.neighborhood}</h4>
              <p className="text-xs text-gray-400 mb-6 font-medium leading-relaxed">Découvrez les services, transports et commodités de ce quartier premium.</p>
              <button className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-tighter shadow-xl">
                 <Navigation size={14} className="fill-current" />
                 Explorer la zone
              </button>
           </div>
        </div>

        <div className="mb-10">
          <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Propriétaire</h3>
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-[2rem] border border-gray-100">
            <img src={property.owner.avatar} alt={property.owner.name} className="w-16 h-16 rounded-[1.5rem] object-cover border-4 border-white shadow-lg" />
            <div className="flex-1">
              <h4 className="font-black text-gray-900 tracking-tighter">{property.owner.name}</h4>
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle2 size={12} className="fill-current text-white bg-green-500 rounded-full" />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Bailleur Vérifié</span>
              </div>
            </div>
            <button className="p-4 bg-white text-indigo-600 rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform">
              <Phone size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Contacter Button exactly like the center detail screen */}
      <div className="fixed bottom-10 left-6 right-6 z-[100]">
        <button 
          onClick={() => navigate(`/chat/${property.id}`)}
          className="w-full bg-amber-500 text-white font-black py-5 rounded-2xl shadow-2xl shadow-amber-200 flex items-center justify-center gap-3 active:scale-95 transition-all uppercase text-sm tracking-widest"
        >
          <MessageCircle size={22} strokeWidth={3} />
          Contacter
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailView;
