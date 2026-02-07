
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Shield, Bell, HelpCircle, Trash2, LogOut, Check } from 'lucide-react';
import { User as UserType } from '../types';

interface SettingsViewProps {
  user: UserType;
  onUpdateUser: (user: UserType) => void;
  onLogout: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ user, onUpdateUser, onLogout }) => {
  const navigate = useNavigate();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateUser({ ...user, name, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white min-h-screen">
      <header className="px-6 py-8 flex items-center gap-4 border-b border-gray-50">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl text-gray-400">
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-xl font-black text-brand-blue tracking-tight">Paramètres</h1>
      </header>

      <div className="p-6 space-y-8">
        {/* Section Profil */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
            <User size={14} /> Informations Personnelles
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 ml-1">NOM COMPLET</label>
              <input 
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-gray-500 ml-1">NUMÉRO DE TÉLÉPHONE</label>
              <input 
                placeholder="6XX XX XX XX"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-800"
              />
            </div>
            <button 
              onClick={handleSave}
              className="w-full bg-brand-blue text-white font-black py-4 rounded-2xl shadow-xl shadow-brand-blue/10 flex items-center justify-center gap-2 text-xs uppercase tracking-widest"
            >
              {saved ? <><Check size={18} /> Enregistré</> : "Enregistrer les modifications"}
            </button>
          </div>
        </section>

        {/* Section Sécurité */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Shield size={14} /> Sécurité
          </h3>
          <div className="space-y-3">
             <SettingItem label="Changer le mot de passe" />
             <SettingItem label="Authentification à deux facteurs" />
          </div>
        </section>

        {/* Section Légal */}
        <section>
          <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <HelpCircle size={14} /> Légal & Aide
          </h3>
          <div className="space-y-3">
             <SettingItem label="Conditions d'utilisation" />
             <SettingItem label="Politique de confidentialité" />
             <SettingItem label="À propos de L'Agent Immobilier" />
          </div>
        </section>

        {/* Actions de compte */}
        <section className="pt-6 border-t border-gray-50 space-y-4">
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-between p-5 bg-red-50 text-red-600 rounded-2xl font-black text-[10px] uppercase tracking-widest"
          >
            Déconnexion <LogOut size={16} />
          </button>
          <button className="w-full flex items-center justify-between p-5 text-gray-300 font-black text-[10px] uppercase tracking-widest">
            Supprimer mon compte <Trash2 size={16} />
          </button>
        </section>
      </div>
    </div>
  );
};

const SettingItem = ({ label }: { label: string }) => (
  <button className="w-full flex justify-between items-center p-4 bg-white border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors">
    <span className="text-sm font-bold text-gray-700">{label}</span>
    <ChevronLeft size={16} className="rotate-180 text-gray-300" />
  </button>
);

export default SettingsView;
