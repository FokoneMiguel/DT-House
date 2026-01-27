
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { Building2, User as UserIcon, Check, Camera, MapPin, Mail, ShieldCheck, ChevronRight, Loader2 } from 'lucide-react';
import { verifyCNI } from '../services/gemini';

interface AuthScreenProps {
  onLogin: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<UserRole>(UserRole.TENANT);
  const [formData, setFormData] = useState({
    name: '', email: '', dob: '', cni: '', code: ''
  });
  const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleGPS = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
    });
  };

  const handleCNIUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        setFormData({...formData, cni: reader.result as string});
      };
      reader.readAsDataURL(file);
    }
  };

  const nextStep = () => setStep(step + 1);

  const finishAuth = () => {
    onLogin({
      id: 'u' + Date.now(),
      name: formData.name || 'Utilisateur HOUZ',
      email: formData.email,
      role: role,
      dob: formData.dob,
      isVerified: true,
      location: location ? { lat: location.lat, lng: location.lng } : undefined,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
      balance: 0
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white px-8 py-12 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-16 h-16 bg-indigo-900 rounded-2xl flex items-center justify-center shadow-xl mb-4 rotate-3">
          <span className="text-white text-3xl font-black">H</span>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4].map(s => (
            <div key={s} className={`h-1 rounded-full transition-all ${step >= s ? 'w-6 bg-indigo-600' : 'w-2 bg-gray-200'}`} />
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right duration-300">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Commençons !</h2>
          <p className="text-gray-500 text-sm mb-8">Choisissez votre type de profil.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[UserRole.TENANT, UserRole.OWNER].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${role === r ? 'border-indigo-600 bg-indigo-50 shadow-inner' : 'border-gray-100 bg-gray-50'}`}
              >
                {r === UserRole.TENANT ? <UserIcon size={32} /> : <Building2 size={32} />}
                <span className="text-[10px] font-black uppercase tracking-widest">{r}</span>
              </button>
            ))}
          </div>
          <button onClick={nextStep} className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-2">
            Suivant <ChevronRight size={18} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right duration-300">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Informations</h2>
          <div className="space-y-4 mb-8">
            <input placeholder="Nom Complet" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="date" placeholder="Date de Naissance" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
            <input type="email" placeholder="Email" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <button onClick={nextStep} disabled={!formData.email} className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl">Suivant</button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right duration-300">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Vérification CNI</h2>
          <p className="text-gray-500 text-sm mb-8">Sécurité obligatoire pour tous les membres.</p>
          <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center mb-8 relative overflow-hidden">
            {formData.cni ? (
              <img src={formData.cni} className="absolute inset-0 w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={40} className="mx-auto text-gray-300 mb-4" />
                <p className="text-xs font-bold text-gray-400">Cliquez pour scanner votre CNI</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleCNIUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <button 
            onClick={handleGPS} 
            className={`w-full mb-4 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm ${location ? 'bg-green-100 text-green-600' : 'bg-amber-50 text-amber-600'}`}
          >
            <MapPin size={18} /> {location ? 'Position capturée' : 'Activer le GPS résidence'}
          </button>
          <button onClick={nextStep} disabled={!formData.cni || !location} className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl">Vérifier</button>
        </div>
      )}

      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right duration-300">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Code Email</h2>
          <p className="text-gray-500 text-sm mb-8">Un code a été envoyé à {formData.email}.</p>
          <div className="flex gap-2 mb-8">
            {[1,2,3,4].map(i => (
              <input key={i} maxLength={1} className="w-full h-16 bg-gray-50 rounded-2xl text-center text-2xl font-black focus:ring-2 focus:ring-indigo-600 outline-none" />
            ))}
          </div>
          <button onClick={finishAuth} className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100">Valider & Entrer</button>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
