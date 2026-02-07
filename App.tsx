
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Heart, User as UserIcon, MessageSquare, 
  PlusSquare, LayoutDashboard, Search as SearchIcon
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
import PaymentView from './views/PaymentView';

const syncChannel = new BroadcastChannel('houz_realtime_sync');

const App: React.FC = () => {
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('houz_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('houz_properties');
    return saved ? JSON.parse(saved) : MOCK_HOUSES;
  });

  // Persistance de l'utilisateur
  useEffect(() => {
    if (user) localStorage.setItem('houz_user', JSON.stringify(user));
    else localStorage.removeItem('houz_user');
  }, [user]);

  // Sauvegarde et Sync des propriétés
  useEffect(() => {
    localStorage.setItem('houz_properties', JSON.stringify(properties));
    syncChannel.postMessage({ type: 'UPDATE_PROPERTIES', data: properties });
  }, [properties]);

  useEffect(() => {
    const handleSync = (event: MessageEvent) => {
      if (event.data.type === 'UPDATE_PROPERTIES') {
        setProperties(event.data.data);
      }
    };
    syncChannel.addEventListener('message', handleSync);
    const timer = setTimeout(() => setIsAppLoaded(true), 2000);
    return () => {
      syncChannel.removeEventListener('message', handleSync);
      clearTimeout(timer);
    };
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const addProperty = (newProp: Property) => {
    setProperties(prev => [newProp, ...prev]);
  };

  const updateProperty = (updatedProp: Property) => {
    setProperties(prev => prev.map(p => p.id === updatedProp.id ? updatedProp : p));
  };

  if (!isAppLoaded) return <SplashScreen />;
  if (!user) return <AuthScreen onLogin={setUser} />;

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-white max-w-md mx-auto relative shadow-2xl overflow-hidden border-x border-gray-100">
        <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
          <Routes>
            <Route path="/" element={user.role === UserRole.OWNER ? <OwnerDashboardView user={user} properties={properties} onUpdateProperty={updateProperty} /> : <HomeView properties={properties} />} />
            <Route path="/search" element={<ResultsView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/property/:id" element={<PropertyDetailView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} user={user} />} />
            <Route path="/favorites" element={<FavoritesView properties={properties} favorites={favorites} onToggleFavorite={toggleFavorite} />} />
            <Route path="/messages" element={<MessageCenterView user={user} />} />
            <Route path="/chat/:id" element={<ChatRoomView user={user} />} />
            <Route path="/profile" element={<ProfileView user={user} onUpdateUser={setUser} onLogout={() => setUser(null)} />} />
            <Route path="/add-listing" element={<AddListingView onAdd={addProperty} owner={user} />} />
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
    <button onClick={() => navigate(path)} className={`flex flex-col items-center gap-1 transition-all ${isActive(path) ? 'text-[#0056b3] scale-110' : 'text-gray-300'}`}>
      <Icon size={24} strokeWidth={isActive(path) ? 2.5 : 2} />
      <span className="text-[9px] font-black uppercase tracking-tighter">{label}</span>
    </button>
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-8 py-4 flex justify-between items-center max-w-md mx-auto z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
      {role === UserRole.TENANT ? (
        <>
          <NavButton path="/" icon={SearchIcon} label="Recherche" />
          <NavButton path="/favorites" icon={Heart} label="Favoris" />
          <NavButton path="/messages" icon={MessageSquare} label="Messages" />
          <NavButton path="/profile" icon={UserIcon} label="Profil" />
        </>
      ) : (
        <>
          <NavButton path="/" icon={LayoutDashboard} label="Bord" />
          <NavButton path="/add-listing" icon={PlusSquare} label="Publier" />
          <NavButton path="/messages" icon={MessageSquare} label="Messages" />
          <NavButton path="/profile" icon={UserIcon} label="Profil" />
        </>
      )}
    </div>
  );
};

export default App;
