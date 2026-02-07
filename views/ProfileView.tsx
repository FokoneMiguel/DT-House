
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Bell, LogOut, ChevronRight, 
  HelpCircle, CreditCard, User as UserIcon,
  Briefcase, Mail, Phone, ShieldCheck, 
  Camera, MapPin, CheckCircle2, ChevronLeft,
  RefreshCcw
} from 'lucide-react';
import { User } from '../types';

interface ProfileViewProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser, onLogout }) => {
  const navigate = useNavigate();
  const [kycStep, setKycStep] = useState<'none' | 'cni' | 'selfie' | 'address'>('none');
  const [isVerifying, setIsVerifying] = useState(false);

  const menuItems = [
    { icon: <Briefcase size={18} />, label: 'Mes Informations' },
    { icon: <CreditCard size={18} />, label: 'Mes annonces' },
    { icon: <Bell size={18} />, label: 'Mes alertes' },
    { icon: <Settings size={18} />, label: 'Paramètres' },
    { icon: <HelpCircle size={18} />, label: 'Aide' },
  ];

  const handleVerificationComplete = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onUpdateUser({ ...user, isVerified: true });
      setIsVerifying(false);
      setKycStep('none');
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Profil</h1>
        <div className="w-10"></div>
      </header>

      <div className="flex flex-col items-center px-6 mb-10">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            {isVerifying && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <RefreshCcw className="animate-spin text-blue-600" />
              </div>
            )}
          </div>
          {user.isVerified && (
            <div className="absolute bottom-1 right-1 bg-green-500 p-2 rounded-full text-white border-4 border-white shadow-lg">
              <CheckCircle2 size={16} />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">{user.name}</h2>
        <p className="text-gray-400 font-bold text-xs mb-8">{user.email}</p>

        <div className="flex gap-3 w-full">
          <button className="flex-1 bg-[#1a3a5f] text-white font-black py-4 rounded-2xl shadow-xl text-[10px] uppercase tracking-widest">
            Mes infos
          </button>
          {!user.isVerified ? (
            <button 
              onClick={() => setKycStep('cni')}
              className="flex-1 bg-orange-500 text-white font-black py-4 rounded-2xl shadow-xl text-[10px] uppercase tracking-widest animate-pulse"
            >
              Vérifier Identité
            </button>
          ) : (
            <div className="flex-1 bg-green-50 text-green-600 font-black py-4 rounded-2xl border border-green-100 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 size={14} /> Compte Certifié
            </div>
          )}
        </div>
      </div>

      <div className="px-6 space-y-3 mb-12">
        {menuItems.map((item, idx) => (
          <button key={idx} className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-50 shadow-sm active:bg-gray-50 transition-all">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-blue-50 text-[#0056b3] rounded-2xl">
                {item.icon}
              </div>
              <span className="font-bold text-gray-800 text-sm">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>

      {kycStep !== 'none' && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-end justify-center backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 animate-in slide-in-from-bottom duration-500 text-center">
            {kycStep === 'cni' && (
              <>
                <ShieldCheck size={56} className="mx-auto text-[#0056b3] mb-6" />
                <h3 className="text-xl font-black mb-2">Carte d'Identité</h3>
                <p className="text-gray-400 text-sm mb-10">Veuillez scanner votre CNI pour la reconnaissance faciale.</p>
                <button onClick={() => setKycStep('selfie')} className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                  <Camera size={20} /> Capturer Document
                </button>
              </>
            )}
            {kycStep === 'selfie' && (
              <>
                <UserIcon size={56} className="mx-auto text-orange-500 mb-6" />
                <h3 className="text-xl font-black mb-2">Reconnaissance Faciale</h3>
                <p className="text-gray-400 text-sm mb-10">Prenez un selfie rapide pour certifier votre identité.</p>
                <button onClick={() => setKycStep('address')} className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                  <Camera size={20} /> Scanner Visage
                </button>
              </>
            )}
            {kycStep === 'address' && (
              <>
                <MapPin size={56} className="mx-auto text-green-500 mb-6" />
                <h3 className="text-xl font-black mb-2">Localisation GPS</h3>
                <p className="text-gray-400 text-sm mb-10">Confirmez votre zone de résidence via GPS.</p>
                <button onClick={handleVerificationComplete} className="w-full bg-[#0056b3] text-white font-black py-5 rounded-2xl">
                  {isVerifying ? <RefreshCcw className="animate-spin mx-auto" /> : "Terminer la Certification"}
                </button>
              </>
            )}
            <button onClick={() => setKycStep('none')} className="mt-6 text-xs font-black text-gray-400 uppercase tracking-widest">Annuler</button>
          </div>
        </div>
      )}

      <div className="px-6 pb-12">
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-black bg-red-50 rounded-3xl uppercase text-[10px] tracking-[0.2em]">
          <LogOut size={18} /> Déconnexion
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
