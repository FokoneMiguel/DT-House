
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Heart, Share2, MapPin, 
  MessageCircle, Phone, Sparkles, CheckCircle2,
  Navigation, Info
} from 'lucide-react';
import { Property } from '../types';
import { getNearbyAmenities } from '../services/gemini';

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
  const [amenitiesInfo, setAmenitiesInfo] = useState<{ text: string, sources: any[] } | null>(null);
  const [isLoadingAmenities, setIsLoadingAmenities] = useState(false);

  useEffect(() => {
    if (property) {
      const fetchAmenities = async () => {
        setIsLoadingAmenities(true);
        const info = await getNearbyAmenities(property.city);
        setAmenitiesInfo(info);
        setIsLoadingAmenities(false);
      };
      fetchAmenities();
    }
  }, [property]);

  if (!property) return <div>Chargement...</div>;

  return (
    <div className="bg-white">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden">
          <img src={property.images[activeImage]} alt={property.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute top-6 left-6 right-6 flex justify-between">
          <button onClick={() => navigate(-1)} className="p-2 bg-white/80 backdrop-blur rounded-xl shadow-lg">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/80 backdrop-blur rounded-xl shadow-lg">
              <Share2 size={24} />
            </button>
            <button 
              onClick={() => onToggleFavorite(property.id)}
              className={`p-2 bg-white/80 backdrop-blur rounded-xl shadow-lg ${favorites.includes(property.id) ? 'text-red-500' : 'text-gray-900'}`}
            >
              <Heart size={24} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 px-3 py-1.5 bg-black/20 backdrop-blur rounded-full">
          {property.images.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(i)}
              className={`w-2 h-2 rounded-full transition-all ${activeImage === i ? 'bg-white w-4' : 'bg-white/50'}`} 
            />
          ))}
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h1>
            <div className="flex items-center gap-1 text-gray-400">
              <MapPin size={16} />
              <span className="text-sm font-medium">{property.city}, {property.country}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-indigo-600">{property.price}{property.currency}</p>
            <p className="text-xs text-gray-400 font-bold uppercase">Par mois</p>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <div className="flex-1 bg-gray-50 p-4 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Type</p>
            <p className="text-sm font-bold text-gray-800">{property.type}</p>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Meublé</p>
            <p className="text-sm font-bold text-gray-800">{property.furnishing}</p>
          </div>
          <div className="flex-1 bg-gray-50 p-4 rounded-2xl text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Durée</p>
            <p className="text-sm font-bold text-gray-800">{property.duration}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed text-sm">
            {property.description}
          </p>
        </div>

        {/* AI Maps Grounding Section */}
        <div className="mb-10 bg-blue-50/50 rounded-3xl p-6 border border-blue-100">
          <div className="flex items-center gap-2 mb-4 text-blue-600">
            <Navigation size={20} className="fill-current" />
            <h3 className="text-lg font-bold">À proximité (IA Maps)</h3>
          </div>
          
          {isLoadingAmenities ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-4 bg-blue-200/30 rounded w-full"></div>
              <div className="h-4 bg-blue-200/30 rounded w-5/6"></div>
              <div className="h-4 bg-blue-200/30 rounded w-4/6"></div>
            </div>
          ) : amenitiesInfo ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">
                {amenitiesInfo.text.split('\n').slice(0, 3).join('\n')}...
              </p>
              <div className="flex flex-wrap gap-2">
                {amenitiesInfo.sources.slice(0, 3).map((source: any, i: number) => (
                  <a 
                    key={i}
                    href={source.maps?.uri}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 bg-white border border-blue-100 px-3 py-1.5 rounded-full text-[10px] font-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                  >
                    <Info size={12} />
                    {source.maps?.title || "Voir sur Maps"}
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">Informations non disponibles.</p>
          )}
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-bold mb-6">Propriétaire</h3>
          <div className="flex items-center gap-4 bg-white border border-gray-100 p-4 rounded-3xl shadow-sm">
            <img src={property.owner.avatar} alt={property.owner.name} className="w-16 h-16 rounded-2xl object-cover" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900">{property.owner.name}</h4>
              <div className="flex items-center gap-1 text-green-500">
                <CheckCircle2 size={14} />
                <span className="text-xs font-semibold">Identité vérifiée</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner active:scale-95 transition-transform">
                <MessageCircle size={24} />
              </button>
              <button className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100 active:scale-95 transition-transform">
                <Phone size={24} />
              </button>
            </div>
          </div>
        </div>

        <button className="w-full bg-indigo-600 text-white font-bold py-5 rounded-3xl shadow-xl shadow-indigo-100 sticky bottom-6 hover:bg-indigo-700 active:scale-[0.98] transition-all">
          Réserver maintenant
        </button>
      </div>
    </div>
  );
};

export default PropertyDetailView;
