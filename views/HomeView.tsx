
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bed, Home, Sofa, LayoutGrid, ChevronLeft, Building2, Ghost
} from 'lucide-react';
import { Property } from '../types';

interface HomeViewProps {
  properties?: Property[];
}

const HomeView: React.FC<HomeViewProps> = ({ properties = [] }) => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Paris');
  const [budget, setBudget] = useState(1200);

  const handleSearch = () => {
    navigate(`/search?city=${city}&budget=${budget}`);
  };

  return (
    <div className="px-6 py-8 relative bg-white min-h-screen">
      <header className="flex items-center gap-4 mb-10">
        <h1 className="text-3xl font-black text-[#1a3a5f] tracking-tighter">Recherche</h1>
      </header>

      <div className="animate-in slide-in-from-bottom duration-700">
        <h2 className="text-xl font-black text-gray-900 mb-10 tracking-tight">Trouver votre logement idéal</h2>
        
        <div className="space-y-8 mb-12">
          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Pays</label>
             <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🇫🇷</div>
                <select className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-3xl font-black text-gray-900 appearance-none focus:ring-4 focus:ring-blue-50/50">
                   <option>France</option>
                   <option>Cameroun</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                   <ChevronLeft className="-rotate-90" size={16} />
                </div>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Ville</label>
             <div className="relative">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-xl">🇫🇷</div>
                <select 
                  className="w-full pl-16 pr-6 py-5 bg-gray-50 border-none rounded-3xl font-black text-gray-900 appearance-none focus:ring-4 focus:ring-blue-50/50"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                >
                   <option>Paris</option>
                   <option>Lyon</option>
                   <option>Yaoundé</option>
                   <option>Douala</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none opacity-40">
                   <ChevronLeft className="-rotate-90" size={16} />
                </div>
             </div>
          </div>

          <div className="space-y-5">
            <div className="flex justify-between items-center">
               <label className="text-[10px] font-black text-gray-900 uppercase tracking-widest">Budget</label>
               <span className="text-[10px] font-black text-[#0056b3] bg-blue-50 px-3 py-1 rounded-full tracking-tighter">Jusqu'à {budget} €/mois</span>
            </div>
            <input 
              type="range" 
              min="200" 
              max="5000" 
              step="50" 
              value={budget} 
              onChange={e => setBudget(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#0056b3]" 
            />
            <div className="flex justify-between text-[8px] font-bold text-gray-300 uppercase tracking-widest">
               <span>Min budget</span>
               <span>Max budget</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '1+ pièce', icon: <Bed size={16} /> },
              { label: 'Appartement', icon: <Home size={16} /> },
              { label: 'Meublé', icon: <Sofa size={16} /> },
              { label: 'Autre', icon: <LayoutGrid size={16} /> },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div className="text-[#0056b3]">{f.icon}</div>
                <span className="text-[10px] font-black uppercase tracking-tight text-gray-600">{f.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-[#0056b3] text-white font-black py-6 rounded-3xl shadow-2xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95 transition-all text-sm uppercase tracking-widest"
        >
          Rechercher
          <ChevronLeft className="rotate-180" size={20} strokeWidth={3} />
        </button>
      </div>

      {properties.filter(p => !p.isRented).length === 0 && (
        <div className="mt-20 flex flex-col items-center justify-center opacity-20">
           <Building2 size={48} className="mb-4" />
           <p className="text-[10px] font-black uppercase tracking-[0.2em]">Aucune offre live</p>
        </div>
      )}
    </div>
  );
};

export default HomeView;
