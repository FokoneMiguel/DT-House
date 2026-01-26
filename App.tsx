
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  User as UserIcon, 
  Home as HomeIcon, 
  LayoutDashboard, 
  Sparkles,
  PlusSquare
} from 'lucide-react';
import { Property, User } from './types';
import { MOCK_HOUSES } from './data/mockHouses';

// Views
import SplashScreen from './views/SplashScreen';
import AuthScreen from './views/AuthScreen';
import HomeView from './views/HomeView';
import ResultsView from './views/ResultsView';
import PropertyDetailView from './views/PropertyDetailView';
import FavoritesView from './views/FavoritesView';
import ProfileView from './views/ProfileView';
import AdminDashboard from './views/AdminDashboard';
import AIEnhanceView from './views/AIEnhanceView';
import ConciergeView from './views/ConciergeView';
import AddListingView from './views/AddListingView';

const App: React.FC = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>(MOCK_HOUSES);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoaded(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  if (!isAppLoaded) return <SplashScreen />;
  if (!user) return <AuthScreen onLogin={setUser} />;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-gray-200">
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/search" element={<ResultsView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/property/:id" element={<PropertyDetailView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/favorites" element={<FavoritesView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/profile" element={<ProfileView user={user} onLogout={() => setUser(null)} />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/ai-enhance" element={<AIEnhanceView />} />
            <Route path="/concierge" element={<ConciergeView />} />
            <Route path="/add-listing" element={<AddListingView onAdd={addProperty} />} />
          </Routes>
        </div>
        <BottomNav isAdmin={user.role === 'admin'} />
      </div>
    </HashRouter>
  );
};

const BottomNav: React.FC<{ isAdmin: boolean }> = ({ isAdmin }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 px-6 py-3 flex justify-between items-center max-w-md mx-auto z-[100]">
      <button onClick={() => navigate('/')} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/') ? 'text-indigo-600' : 'text-gray-400'}`}>
        <HomeIcon size={22} />
        <span className="text-[10px] font-bold">Explorer</span>
      </button>
      <button onClick={() => navigate('/favorites')} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/favorites') ? 'text-indigo-600' : 'text-gray-400'}`}>
        <Heart size={22} />
        <span className="text-[10px] font-bold">Favoris</span>
      </button>
      <button onClick={() => navigate('/add-listing')} className={`flex flex-col items-center gap-1 -mt-8`}>
        <div className={`p-4 rounded-full border-4 border-white shadow-xl transition-all ${isActive('/add-listing') ? 'bg-indigo-600 scale-110' : 'bg-gray-800 hover:bg-indigo-600'}`}>
          <PlusSquare size={24} className="text-white" />
        </div>
        <span className="text-[10px] font-bold text-gray-500 mt-1">Publier</span>
      </button>
      <button onClick={() => navigate('/ai-enhance')} className={`flex flex-col items-center gap-1 transition-colors ${isActive('/ai-enhance') ? 'text-indigo-600' : 'text-gray-400'}`}>
        <Sparkles size={22} />
        <span className="text-[10px] font-bold">IA Lab</span>
      </button>
      <button onClick={() => navigate(isAdmin ? '/admin' : '/profile')} className={`flex flex-col items-center gap-1 transition-colors ${isActive(isAdmin ? '/admin' : '/profile') ? 'text-indigo-600' : 'text-gray-400'}`}>
        {isAdmin ? <LayoutDashboard size={22} /> : <UserIcon size={22} />}
        <span className="text-[10px] font-bold">{isAdmin ? 'Admin' : 'Profil'}</span>
      </button>
    </div>
  );
};

export default App;
