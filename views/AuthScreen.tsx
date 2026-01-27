
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  Building2, User as UserIcon, Camera, MapPin, 
  Mail, ShieldCheck, ChevronRight, Loader2, 
  Calendar, MapPinned, Fingerprint, RefreshCcw 
} from 'lucide-react';
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
  const [isCapturingGPS, setIsCapturingGPS] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);

  const handleGPS = () => {
    setIsCapturingGPS(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setIsCapturingGPS(false);
      },
      () => setIsCapturingGPS(false)
    );
  };

  const handleCNIUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFormData({...formData, cni: reader.result as string});
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
    <div className="flex flex-col h-screen bg-white px-8 py-12 overflow-y-auto hide-scrollbar">
      <header className="flex flex-col items-center mb-10">
        <div className="w-20 h-20 bg-indigo-900 rounded-[2rem] flex items-center justify-center shadow-2xl mb-6 transform -rotate-6">
          <span className="text-white text-4xl font-black">H</span>
        </div>
        <div className="flex gap-1.5 h-1.5">
          {[1,2,3,4,5].map(s => (
            <div key={s} className={`rounded-full transition-all duration-500 ${step >= s ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-100'}`} />
          ))}
        </div>
      </header>

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom duration-500">
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Qui êtes-vous ?</h2>
          <p className="text-gray-400 text-sm mb-10 font-medium">Choisissez le type de compte HOUZ.</p>
          <div className="grid grid-cols-1 gap-4 mb-10">
            {[UserRole.TENANT, UserRole.OWNER].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`p-8 rounded-[2.5rem] border-2 flex items-center gap-6 transition-all ${role === r ? 'border-indigo-600 bg-indigo-50 shadow-xl shadow-indigo-100/50' : 'border-gray-50 bg-gray-50'}`}
              >
                <div className={`p-4 rounded-2xl ${role === r ? 'bg-indigo-600 text-white' : 'bg-white text-gray-400'}`}>
                  {r === UserRole.TENANT ? <UserIcon size={32} /> : <Building2 size={32} />}
                </div>
                <div className="text-left">
                  <span className="block text-lg font-black text-gray-900">{r}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{r === UserRole.TENANT ? 'Je cherche un logement' : 'Je loue mes biens'}</span>
                </div>
              </button>
            ))}
          </div>
          <button onClick={nextStep} className="w-full bg-indigo-900 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 shadow-2xl shadow-indigo-100">
            Commencer <ChevronRight size={20} />
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Profil</h2>
          <p className="text-gray-400 text-sm mb-10 font-medium">Vos informations personnelles.</p>
          <div className="space-y-4 mb-10">
            <div className="relative">
              <UserIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input placeholder="Nom et Prénom" className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-[2rem] border-none font-bold text-gray-800 focus:ring-2 focus:ring-indigo-100" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="relative">
              <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input type="date" className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-[2rem] border-none font-bold text-gray-800 focus:ring-2 focus:ring-indigo-100" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} />
            </div>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input type="email" placeholder="Email professionnel" className="w-full pl-14 pr-6 py-5 bg-gray-50 rounded-[2rem] border-none font-bold text-gray-800 focus:ring-2 focus:ring-indigo-100" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          <button onClick={nextStep} disabled={!formData.name || !formData.email} className="w-full bg-indigo-900 text-white font-black py-5 rounded-[2rem] disabled:opacity-50">Continuer</button>
        </div>
      )}

      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Localisation</h2>
          <p className="text-gray-400 text-sm mb-10 font-medium">Vérification de votre résidence actuelle.</p>
          
          <div className="bg-gray-50 rounded-[2.5rem] p-8 text-center mb-8 border-2 border-dashed border-gray-200">
            <MapPinned size={48} className="mx-auto text-indigo-200 mb-4" />
            <p className="text-xs font-bold text-gray-500 mb-6 leading-relaxed">Nous devons enregistrer votre position GPS pour certifier votre zone de résidence.</p>
            <button 
              onClick={handleGPS} 
              disabled={isCapturingGPS}
              className={`px-8 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 mx-auto transition-all ${location ? 'bg-green-100 text-green-600' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'}`}
            >
              {isCapturingGPS ? <RefreshCcw className="animate-spin" size={18} /> : location ? <><Fingerprint size={18} /> Position certifiée</> : 'Capturer ma position'}
            </button>
          </div>

          <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-center gap-4 mb-10">
            <div className="p-3 bg-white rounded-xl text-amber-500 shadow-sm"><RefreshCcw size={20} /></div>
            <p className="text-[10px] font-bold text-amber-800 leading-relaxed uppercase tracking-widest">Captcha Anti-Robot</p>
            <button onClick={() => setCaptchaVerified(true)} className={`ml-auto px-4 py-2 rounded-xl text-[10px] font-black uppercase ${captchaVerified ? 'bg-green-500 text-white' : 'bg-white text-amber-600 border border-amber-200'}`}>
              {captchaVerified ? 'Vérifié' : 'Je ne suis pas un robot'}
            </button>
          </div>

          <button onClick={nextStep} disabled={!location || !captchaVerified} className="w-full bg-indigo-900 text-white font-black py-5 rounded-[2rem] disabled:opacity-50">Suivant</button>
        </div>
      )}

      {step === 4 && (
        <div className="animate-in fade-in slide-in-from-right duration-500">
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tighter">Identité</h2>
          <p className="text-gray-400 text-sm mb-10 font-medium">Vérification obligatoire de votre CNI.</p>
          <div className="bg-gray-50 border-4 border-dashed border-gray-100 rounded-[3rem] p-10 text-center mb-10 relative overflow-hidden group">
            {formData.cni ? (
              <img src={formData.cni} className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
            ) : (
              <>
                <div className="bg-white w-20 h-20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl text-indigo-600">
                  <Camera size={32} />
                </div>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Scanner ma CNI</p>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleCNIUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
          </div>
          <button onClick={nextStep} disabled={!formData.cni} className="w-full bg-indigo-900 text-white font-black py-5 rounded-[2rem] disabled:opacity-50 shadow-2xl shadow-indigo-100">Soumettre pour vérification</button>
        </div>
      )}

      {step === 5 && (
        <div className="animate-in fade-in slide-in-from-right duration-500 text-center">
          <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-500">
            <Mail size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Code de validation</h2>
          <p className="text-gray-400 text-sm mb-10 font-medium leading-relaxed">Un code de sécurité a été envoyé à : <br/><span className="text-indigo-600 font-bold">{formData.email}</span></p>
          <div className="flex gap-4 justify-center mb-12">
            {[1,2,3,4].map(i => (
              <input key={i} maxLength={1} className="w-16 h-20 bg-gray-50 rounded-2xl text-center text-3xl font-black text-indigo-900 focus:ring-4 focus:ring-indigo-100 outline-none border-none shadow-inner" />
            ))}
          </div>
          <button onClick={finishAuth} className="w-full bg-indigo-900 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100">Valider & Entrer sur HOUZ</button>
          <button className="mt-8 text-xs font-black text-gray-400 uppercase tracking-widest">Renvoyer le code</button>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
