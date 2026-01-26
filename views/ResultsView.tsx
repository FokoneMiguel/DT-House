
import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Filter, Heart, MapPin, Sparkles, X, Search } from 'lucide-react';
import { Property } from '../types';
import { getCityInsights } from '../services/gemini';

interface ResultsViewProps {
  properties: Property[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ properties, favorites, onToggleFavorite }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const city = searchParams.get('city') || 'Partout';
  const country = searchParams.get('country') || 'France';

  const [showFilters, setShowFilters] = useState(false);
  const [cityInsights, setCityInsights] = useState<{ text: string, sources: any[] } | null>(null);
  const [isAIThinking, setIsAIThinking] = useState(false);

  useEffect(() => {
    if (city !== 'Partout') {
      const fetchInsights = async () => {
        setIsAIThinking(true);
        const insights = await getCityInsights(city, country);
        setCityInsights(insights);
        setIsAIThinking(false);
      };
      fetchInsights();
    }
  }, [city, country]);

  const filteredProperties = properties.filter(p => 
    (city === 'Partout' || p.city.toLowerCase().includes(city.toLowerCase()))
  );

  return (
    <div className="px-6 py-6 pb-24">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Résultats</p>
          <h2 className="text-xl font-bold text-gray-900">{city}</h2>
        </div>
        <button 
          onClick={() => setShowFilters(true)}
          className="p-2 bg-white rounded-xl shadow-sm border border-gray-100"
        >
          <Filter size={24} className="text-indigo-600" />
        </button>
      </div>

      {isAIThinking && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 animate-pulse">
          <div className="flex items-center gap-2 text-indigo-600 mb-2">
            <Sparkles size={18} />
            <span className="text-sm font-bold">L'IA prépare des conseils pour {city}...</span>
          </div>
          <div className="h-4 bg-indigo-200/50 rounded w-full mb-2"></div>
          <div className="h-4 bg-indigo-200/50 rounded w-3/4"></div>
        </div>
      )}

      {cityInsights && !isAIThinking && (
        <div className="mb-8 bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-2xl text-white shadow-lg relative overflow-hidden group">
          <Sparkles className="absolute -top-2 -right-2 text-white/10 w-24 h-24 rotate-12" />
          <h3 className="text-sm font-bold flex items-center gap-2 mb-2">
            <Sparkles size={16} /> Insight Local IA
          </h3>
          <p className="text-xs leading-relaxed opacity-90 mb-3">{cityInsights.text.slice(0, 200)}...</p>
          <div className="flex gap-2">
            {cityInsights.sources.slice(0, 2).map((s: any, i: number) => (
              <a 
                key={i} 
                href={s.web?.uri} 
                target="_blank" 
                rel="noreferrer" 
                className="text-[10px] bg-white/20 px-2 py-1 rounded-full font-medium"
              >
                Source: {s.web?.title?.slice(0, 15)}
              </a>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map(property => (
            <div 
              key={property.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-md shadow-gray-100 border border-gray-50 group transition-transform active:scale-[0.98]"
              onClick={() => navigate(`/property/${property.id}`)}
            >
              <div className="relative aspect-[16/10]">
                <img src={property.imageUrl} alt={property.title} className="w-full h-full object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleFavorite(property.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-red-500 shadow-lg"
                >
                  <Heart size={20} fill={favorites.includes(property.id) ? 'currentColor' : 'none'} />
                </button>
                <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full shadow-sm">
                  <span className="text-xs font-bold text-gray-900">{property.type}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-900 line-clamp-1 flex-1">{property.title}</h3>
                  <p className="font-bold text-indigo-600 ml-4">{property.price}{property.currency}<span className="text-[10px] text-gray-400 font-medium">/mois</span></p>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <MapPin size={14} />
                  <span className="text-xs font-medium">{property.city}, {property.country}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search size={32} />
            </div>
            <p className="font-bold text-gray-900">Aucun logement trouvé</p>
            <p className="text-sm text-gray-400">Essayez d'autres filtres ou une autre ville.</p>
          </div>
        )}
      </div>

      {showFilters && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-end animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md mx-auto rounded-t-3xl p-8 slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold">Filtres</h3>
              <button onClick={() => setShowFilters(false)} className="p-2 bg-gray-100 rounded-full"><X size={20} /></button>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="font-bold text-sm">Budget (mensuel)</p>
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Min</span>
                    <input type="number" placeholder="0" className="w-full p-3 bg-gray-50 rounded-xl font-bold border-none" />
                  </div>
                  <div className="flex-1 space-y-2">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Max</span>
                    <input type="number" placeholder="5000" className="w-full p-3 bg-gray-50 rounded-xl font-bold border-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="font-bold text-sm">Type de bien</p>
                <div className="flex flex-wrap gap-2">
                  {['Chambre', 'Studio', 'Appartement', 'Maison'].map(t => (
                    <button key={t} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-xs font-semibold hover:bg-indigo-50 hover:border-indigo-200 transition-colors">{t}</button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setShowFilters(false)}
                className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100"
              >
                Appliquer les filtres
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
