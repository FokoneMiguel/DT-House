
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, User as UserIcon, Home as HomeIcon, 
  MessageSquare, PlusSquare, LayoutDashboard, Wallet,
  Sparkles
} from 'lucide-react';
import { User, UserRole, Property } from './types';
import { MOCK_HOUSES } from './data/mockHouses';

// Views
import SplashScreen from './views/SplashScreen';
import AuthScreen from './views/AuthScreen';
import HomeView from './views/HomeView';
import ResultsView from './views/ResultsView';
import PropertyDetailView from './views/PropertyDetailView';
import FavoritesView from './views/FavoritesView';
import ProfileView from './views/ProfileView';
import MessageCenterView from './views/MessageCenterView';
import ChatRoomView from './views/ChatRoomView';
import AddListingView from './views/AddListingView';
import OwnerDashboardView from './views/OwnerDashboardView';
import AIEnhanceView from './views/AIEnhanceView';
import PaymentView from './views/PaymentView';

const App: React.FC = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>(MOCK_HOUSES);

  useEffect(() => {
    const timer = setTimeout(() => setIsAppLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const addProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  if (!isAppLoaded) return <SplashScreen />;
  if (!user) return <AuthScreen onLogin={setUser} />;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-gray-100">
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          <Routes>
            <Route path="/" element={user.role === UserRole.OWNER ? <OwnerDashboardView user={user} properties={properties} /> : <HomeView properties={properties} />} />
            <Route path="/search" element={<ResultsView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/property/:id" element={<PropertyDetailView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/favorites" element={<FavoritesView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/messages" element={<MessageCenterView user={user} />} />
            <Route path="/chat/:id" element={<ChatRoomView user={user} />} />
            <Route path="/profile" element={<ProfileView user={user} onLogout={() => setUser(null)} />} />
            <Route path="/add-listing" element={<AddListingView onAdd={addProperty} owner={user} />} />
            <Route path="/ai-lab" element={<AIEnhanceView />} />
            <Route path="/payment" element={<PaymentView />} />
          </Routes>
        </div>
        <BottomNav role={user.role} />
      </div>
    </HashRouter>
  );
};

const BottomNav: React.FC<{ role: UserRole }> = ({ role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const NavButton = ({ path, icon: Icon, label }: any) => (
    <button onClick={() => navigate(path)} className={`flex flex-col items-center gap-1 transition-all ${isActive(path) ? 'text-indigo-600 scale-110' : 'text-gray-400'}`}>
      <Icon size={24} strokeWidth={isActive(path) ? 2.5 : 2} />
      <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center max-w-md mx-auto z-[100] shadow-2xl">
      {role === UserRole.TENANT ? (
        <>
          <NavButton path="/" icon={HomeIcon} label="HOUZ" />
          <NavButton path="/favorites" icon={Heart} label="Favoris" />
          <button onClick={() => navigate('/ai-lab')} className="bg-indigo-600 p-4 rounded-2xl -mt-12 shadow-xl shadow-indigo-200 text-white transform active:scale-90 transition-all">
            <Sparkles size={24} />
          </button>
          <NavButton path="/messages" icon={MessageSquare} label="Chats" />
          <NavButton path="/profile" icon={UserIcon} label="Profil" />
        </>
      ) : (
        <>
          <NavButton path="/" icon={LayoutDashboard} label="Bord" />
          <NavButton path="/add-listing" icon={PlusSquare} label="Publier" />
          <div className="w-12 h-12 flex items-center justify-center bg-amber-500 rounded-2xl -mt-12 shadow-xl shadow-amber-100 text-white"><Wallet size={24} /></div>
          <NavButton path="/messages" icon={MessageSquare} label="Chats" />
          <NavButton path="/profile" icon={UserIcon} label="Profil" />
        </>
      )}
    </div>
  );
};

export default App;
