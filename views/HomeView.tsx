
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Globe, Sparkles, PlusCircle, Bed, Home, Sofa, LayoutGrid, ChevronLeft } from 'lucide-react';
import { PropertyType } from '../types';

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('Yaoundé');
  const [budget, setBudget] = useState(120000);

  const handleSearch = () => {
    navigate(`/search?city=${city}&budget=${budget}`);
  };

  return (
    <div className="px-6 py-8 relative bg-white min-h-screen">
      <header className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Recherche</h1>
      </header>

      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-900 leading-tight mb-8">
          Trouver votre <br />logement idéal
        </h2>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Lieu</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 font-bold">🇨🇲</div>
              <select 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl appearance-none font-bold text-gray-800 focus:ring-2 focus:ring-indigo-100 transition-all"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option>Yaoundé</option>
                <option>Douala</option>
                <option>Kribi</option>
                <option>Bafoussam</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Budget</label>
              <span className="text-xs font-black text-gray-600">Jusqu'à {budget.toLocaleString()} FCFA</span>
            </div>
            <input 
              type="range" 
              min="50000" 
              max="2000000" 
              step="10000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: '1+ pièce', icon: <Bed size={16} />, active: true },
              { label: 'Appartement', icon: <Home size={16} /> },
              { label: 'Meublé', icon: <Sofa size={16} /> },
              { label: 'Tout', icon: <LayoutGrid size={16} /> },
            ].map((filter, i) => (
              <button 
                key={i}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${filter.active ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-gray-50 border-transparent text-gray-400'}`}
              >
                {filter.icon}
                <span className="text-xs font-bold">{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={handleSearch}
        className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-[0.97] transition-all"
      >
        <span>Rechercher</span>
        <ChevronLeft className="rotate-180" size={18} strokeWidth={3} />
      </button>

      {/* Quick Access AI Section */}
      <div className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-amber-500 p-3 rounded-2xl text-white shadow-lg shadow-amber-200">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="text-xs font-black text-amber-900 uppercase">HOUZ AI</p>
            <p className="text-[10px] text-amber-700 font-bold opacity-70">Concierge Intelligent</p>
          </div>
        </div>
        <button onClick={() => navigate('/ai-lab')} className="bg-white p-2 rounded-xl text-amber-500 shadow-sm">
          <ChevronLeft className="rotate-180" size={16} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
};

export default HomeView;
