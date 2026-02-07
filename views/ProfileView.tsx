
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Bell, LogOut, ChevronRight, 
  HelpCircle, CreditCard, User as UserIcon,
  Briefcase, Mail, Phone, ShieldCheck, 
  Camera, MapPin, CheckCircle2, AlertTriangle, ChevronLeft,
  RefreshCcw
} from 'lucide-react';
import { User, UserRole } from '../types';
import { verifyCNI } from '../services/gemini';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [kycStep, setKycStep] = useState<'none' | 'cni' | 'selfie' | 'address' | 'pending'>('none');
  const [isVerifying, setIsVerifying] = useState(false);

  const menuItems = [
    { icon: <Briefcase size={18} />, label: 'Mes Informations', sub: 'Données personnelles' },
    { icon: <CreditCard size={18} />, label: 'Mes annonces', sub: 'Gestion locative' },
    { icon: <Bell size={18} />, label: 'Mes alertes', sub: 'Préférences de recherche' },
    { icon: <Settings size={18} />, label: 'Paramètres', sub: 'Configuration' },
    { icon: <HelpCircle size={18} />, label: 'Aide', sub: 'Support client' },
  ];

  const startVerification = () => setKycStep('cni');

  const handleCNI = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsVerifying(true);
    // Simulation d'analyse IA Gemini
    setTimeout(() => {
      setIsVerifying(false);
      setKycStep('selfie');
    }, 2000);
  };

  const handleSelfie = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setKycStep('address');
    }, 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">Profil</h1>
        <div className="w-10 flex justify-end">
           <UserIcon size={20} className="text-gray-900" />
        </div>
      </header>

      {/* Profile Info - Match Image 3 */}
      <div className="flex flex-col items-center px-6 mb-8">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          {user.isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white border-2 border-white">
              <CheckCircle2 size={14} />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tighter mb-2">{user.name}</h2>
        <div className="space-y-1 text-center">
           <div className="flex items-center justify-center gap-2 text-gray-400">
             <Phone size={14} className="text-blue-600" />
             <span className="text-xs font-bold">+33 6 12 34 56 78</span>
           </div>
           <div className="flex items-center justify-center gap-2 text-gray-400">
             <Mail size={14} className="text-blue-600" />
             <span className="text-xs font-bold">{user.email}</span>
           </div>
        </div>

        <div className="flex gap-3 mt-8 w-full">
          <button className="flex-1 bg-[#0056b3] text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-100 text-[10px] uppercase tracking-widest">
            Mes informations
          </button>
          <button 
            onClick={startVerification}
            className={`flex-1 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest border transition-all ${user.isVerified ? 'bg-green-50 text-green-600 border-green-100' : 'bg-gray-50 text-gray-900 border-gray-100'}`}
          >
            {user.isVerified ? 'Vérifié' : 'Vérifier mon identité'}
          </button>
        </div>
      </div>

      {/* KYC Verification Drawer Simulation */}
      {kycStep !== 'none' && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-end animate-in fade-in duration-300">
           <div className="w-full bg-white rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-500 max-w-md mx-auto">
              <div className="w-12 h-1.5 bg-gray-100 rounded-full mx-auto mb-8"></div>
              
              {kycStep === 'cni' && (
                <div className="text-center">
                  <ShieldCheck size={48} className="mx-auto text-blue-600 mb-6" />
                  <h3 className="text-xl font-black mb-2">Étape 1 : Pièce d'identité</h3>
                  <p className="text-gray-400 text-sm mb-8">Prenez une photo claire de votre CNI ou Passeport pour débloquer les services.</p>
                  <label className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 cursor-pointer">
                    {isVerifying ? <RefreshCcw className="animate-spin" /> : <Camera />}
                    Capturer ma CNI
                    <input type="file" className="hidden" accept="image/*" onChange={handleCNI} />
                  </label>
                </div>
              )}

              {kycStep === 'selfie' && (
                <div className="text-center">
                  <UserIcon size={48} className="mx-auto text-blue-600 mb-6" />
                  <h3 className="text-xl font-black mb-2">Étape 2 : Scan du visage</h3>
                  <p className="text-gray-400 text-sm mb-8">Prenez un selfie pour confirmer que vous êtes bien le titulaire du document.</p>
                  <button onClick={handleSelfie} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                    {isVerifying ? <RefreshCcw className="animate-spin" /> : <Camera />}
                    Démarrer le scan facial
                  </button>
                </div>
              )}

              {kycStep === 'address' && (
                <div className="text-center">
                  <MapPin size={48} className="mx-auto text-blue-600 mb-6" />
                  <h3 className="text-xl font-black mb-2">Étape 3 : Résidence</h3>
                  <p className="text-gray-400 text-sm mb-8">Autorisez la géolocalisation pour certifier votre adresse de résidence actuelle.</p>
                  <button onClick={() => setKycStep('none')} className="w-full bg-blue-600 text-white font-black py-5 rounded-2xl">Certifier ma position</button>
                </div>
              )}

              <button onClick={() => setKycStep('none')} className="w-full mt-4 py-3 text-xs font-bold text-gray-400 uppercase">Annuler</button>
           </div>
        </div>
      )}

      {/* Menu Items - Match Image 3 */}
      <div className="px-6 space-y-3 mb-10">
        {menuItems.map((item, idx) => (
          <button key={idx} className="w-full flex items-center justify-between p-5 bg-white rounded-[1.5rem] border border-gray-50 shadow-sm group active:scale-[0.98] transition-all">
            <div className="flex items-center gap-5">
              <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {item.icon}
              </div>
              <div className="text-left">
                <span className="block font-bold text-gray-900 text-sm">{item.label}</span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </button>
        ))}
      </div>

      <div className="px-6 pb-32">
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-3 p-5 text-orange-500 font-black bg-orange-50 rounded-2xl hover:bg-orange-100 transition-colors uppercase text-[10px] tracking-widest"
        >
          <LogOut size={18} />
          Déconnexion
        </button>
      </div>
    </div>
  );
};

export default ProfileView;