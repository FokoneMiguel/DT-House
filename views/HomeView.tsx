
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Globe, Sparkles, PlusCircle } from 'lucide-react';

const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const [country, setCountry] = useState('France');
  const [city, setCity] = useState('');

  const handleSearch = () => {
    navigate(`/search?country=${country}&city=${city}`);
  };

  return (
    <div className="px-6 py-8 relative">
      <header className="mb-10 animate-in fade-in slide-in-from-top-4 duration-700 flex justify-between items-start">
        <div>
          <p className="text-indigo-600 font-bold text-xs uppercase tracking-widest mb-2">Marketplace Immobilier</p>
          <h1 className="text-3xl font-black text-gray-900 leading-tight">
            Votre futur chez-vous <br />
            <span className="text-indigo-600 underline decoration-indigo-200 decoration-4 underline-offset-4">est ici</span>
          </h1>
        </div>
        <button 
          onClick={() => navigate('/add-listing')}
          className="p-3 bg-white rounded-2xl shadow-lg border border-gray-50 text-indigo-600 active:scale-95 transition-all flex flex-col items-center gap-1"
        >
          <PlusCircle size={24} />
          <span className="text-[8px] font-black uppercase">Publier</span>
        </button>
      </header>

      <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl shadow-gray-200 border border-gray-50 space-y-6 relative z-10 animate-in zoom-in-95 duration-500">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Destination</label>
          <div className="relative group">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 transition-transform group-focus-within:scale-110" size={20} />
            <select 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl appearance-none font-bold text-gray-800 focus:ring-4 focus:ring-indigo-100 transition-all"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>France</option>
              <option>Belgique</option>
              <option>Maroc</option>
              <option>Canada</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Ville</label>
          <div className="relative group">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500 transition-transform group-focus-within:scale-110" size={20} />
            <input 
              type="text" 
              placeholder="Ex: Paris, Lyon, Casablanca..."
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800 placeholder:text-gray-300 focus:ring-4 focus:ring-indigo-100 transition-all"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
        </div>

        <button 
          onClick={handleSearch}
          className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 active:scale-[0.97] transition-all"
        >
          <Search size={22} strokeWidth={3} />
          <span>Trouver un logement</span>
        </button>
      </div>

      {/* AI Assistant Call to Action */}
      <div 
        onClick={() => navigate('/concierge')}
        className="mt-8 bg-gradient-to-r from-indigo-900 to-indigo-700 p-5 rounded-3xl text-white shadow-lg cursor-pointer flex items-center justify-between hover:scale-[1.02] active:scale-95 transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <p className="font-black text-sm">Concierge IA Vocal</p>
            <p className="text-[10px] text-indigo-100 font-medium opacity-80">Trouvez par la voix en 30 secondes</p>
          </div>
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        </div>
      </div>

      <section className="mt-12 mb-10">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-xl font-black text-gray-900">Destinations</h2>
          <button className="text-xs font-bold text-indigo-600 px-3 py-1 bg-indigo-50 rounded-full">Explorer</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {[
            { name: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', count: '1.2k+' },
            { name: 'Marrakech', img: 'https://images.unsplash.com/photo-1597212618440-8062a50406b9?w=400&q=80', count: '400+' },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-3xl overflow-hidden aspect-[4/5] group cursor-pointer" onClick={() => navigate(`/search?city=${item.name}`)}>
              <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>
              <div className="absolute bottom-5 left-5 text-white">
                <p className="font-black text-xl">{item.name}</p>
                <p className="text-[10px] font-bold opacity-80 tracking-widest uppercase">{item.count} log.</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomeView;
