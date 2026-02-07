
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, Bell, LogOut, ChevronRight, 
  HelpCircle, CreditCard, User as UserIcon,
  ShieldCheck, Camera, MapPin, CheckCircle2, ChevronLeft,
  RefreshCcw, Clock
} from 'lucide-react';
import { User, VerificationStatus } from '../types';

interface ProfileViewProps {
  user: User;
  onUpdateUser: (user: User) => void;
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onUpdateUser, onLogout }) => {
  const navigate = useNavigate();
  const [kycStep, setKycStep] = useState<'none' | 'cni' | 'selfie' | 'address'>('none');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleKycSubmission = () => {
    setIsVerifying(true);
    // Simulation d'envoi à l'admin
    setTimeout(() => {
      onUpdateUser({ 
        ...user, 
        verificationStatus: VerificationStatus.PENDING,
        kycDetails: { submittedAt: new Date().toISOString() }
      });
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
        <h1 className="text-xl font-black text-brand-blue tracking-tight">Mon Profil</h1>
        <button onClick={() => navigate('/settings')} className="p-2 text-brand-blue">
          <Settings size={20} />
        </button>
      </header>

      <div className="flex flex-col items-center px-6 mb-10">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-2xl">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          {user.verificationStatus === VerificationStatus.VERIFIED && (
            <div className="absolute bottom-1 right-1 bg-green-500 p-2 rounded-full text-white border-4 border-white shadow-lg">
              <CheckCircle2 size={16} />
            </div>
          )}
          {user.verificationStatus === VerificationStatus.PENDING && (
            <div className="absolute bottom-1 right-1 bg-brand-orange p-2 rounded-full text-white border-4 border-white shadow-lg">
              <Clock size={16} />
            </div>
          )}
        </div>
        <h2 className="text-2xl font-black text-brand-blue tracking-tighter mb-1">{user.name}</h2>
        <div className="flex items-center gap-2 mb-8">
           <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{user.role}</span>
           <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
           <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue">{user.email}</span>
        </div>

        <div className="w-full">
          {user.verificationStatus === VerificationStatus.NOT_VERIFIED && (
            <button 
              onClick={() => setKycStep('cni')}
              className="w-full bg-brand-orange text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-orange/20 text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              Faire vérifier mon compte
            </button>
          )}
          {user.verificationStatus === VerificationStatus.PENDING && (
            <div className="w-full bg-orange-50 text-brand-orange font-black py-4 rounded-2xl border border-orange-100 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
              <Clock size={14} /> Vérification par l'admin en cours...
            </div>
          )}
          {user.verificationStatus === VerificationStatus.VERIFIED && (
            <div className="w-full bg-green-50 text-green-600 font-black py-4 rounded-2xl border border-green-100 text-[10px] uppercase tracking-widest flex items-center justify-center gap-2">
              <CheckCircle2 size={14} /> Compte Certifié L'Agent
            </div>
          )}
        </div>
      </div>

      <div className="px-6 space-y-3 mb-12">
        <MenuButton icon={<UserIcon size={18}/>} label="Modifier mes infos" onClick={() => navigate('/settings')} />
        <MenuButton icon={<CreditCard size={18}/>} label="Mes Annonces" onClick={() => {}} />
        <MenuButton icon={<Bell size={18}/>} label="Notifications" onClick={() => navigate('/settings')} />
        <MenuButton icon={<Settings size={18}/>} label="Paramètres de sécurité" onClick={() => navigate('/settings')} />
        <MenuButton icon={<HelpCircle size={18}/>} label="Support & Aide" onClick={() => navigate('/settings')} />
      </div>

      <div className="px-6 pb-12">
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 p-5 text-red-500 font-black bg-red-50 rounded-3xl uppercase text-[10px] tracking-[0.2em]">
          <LogOut size={18} /> Déconnexion
        </button>
      </div>

      {kycStep !== 'none' && (
        <div className="fixed inset-0 bg-black/60 z-[200] flex items-end justify-center backdrop-blur-sm p-4">
          <div className="w-full max-w-sm bg-white rounded-[3rem] p-10 text-center animate-in slide-in-from-bottom duration-500">
            {kycStep === 'cni' && (
              <>
                <ShieldCheck size={56} className="mx-auto text-brand-blue mb-6" />
                <h3 className="text-xl font-black mb-2 text-brand-blue">Document d'identité</h3>
                <p className="text-gray-400 text-sm mb-10 leading-relaxed">Téléchargez une photo de votre CNI ou Passeport pour soumission à l'administrateur.</p>
                <button onClick={() => setKycStep('selfie')} className="w-full bg-brand-blue text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                  <Camera size={20} /> Capturer Document
                </button>
              </>
            )}
            {kycStep === 'selfie' && (
              <>
                <UserIcon size={56} className="mx-auto text-brand-orange mb-6" />
                <h3 className="text-xl font-black mb-2 text-brand-blue">Reconnaissance Faciale</h3>
                <p className="text-gray-400 text-sm mb-10">Un selfie est nécessaire pour comparer avec votre document.</p>
                <button onClick={() => setKycStep('address')} className="w-full bg-brand-blue text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3">
                  <Camera size={20} /> Faire le Selfie
                </button>
              </>
            )}
            {kycStep === 'address' && (
              <>
                <MapPin size={56} className="mx-auto text-green-500 mb-6" />
                <h3 className="text-xl font-black mb-2 text-brand-blue">Position GPS</h3>
                <p className="text-gray-400 text-sm mb-10">Confirmez votre position actuelle pour certifier votre adresse.</p>
                <button onClick={handleKycSubmission} className="w-full bg-brand-blue text-white font-black py-5 rounded-2xl">
                  {isVerifying ? <RefreshCcw className="animate-spin mx-auto" /> : "Soumettre à l'Administrateur"}
                </button>
              </>
            )}
            <button onClick={() => setKycStep('none')} className="mt-6 text-xs font-black text-gray-300 uppercase tracking-widest">Annuler</button>
          </div>
        </div>
      )}
    </div>
  );
};

const MenuButton = ({ icon, label, onClick }: any) => (
  <button onClick={onClick} className="w-full flex items-center justify-between p-5 bg-white rounded-3xl border border-gray-50 shadow-sm active:bg-gray-50 transition-all group">
    <div className="flex items-center gap-5">
      <div className="p-3 bg-gray-50 text-brand-blue rounded-2xl group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <span className="font-bold text-gray-800 text-sm">{label}</span>
    </div>
    <ChevronRight size={18} className="text-gray-200 group-hover:text-brand-orange transition-colors" />
  </button>
);

export default ProfileView;
