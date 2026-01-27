
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Wallet, Smartphone, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';

const PaymentView: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const amount = parseInt(params.get('amount') || '0');
  const [method, setMethod] = useState<'MTN' | 'ORANGE' | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const commission = amount * 0.05;
  const total = amount + commission;

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => setStatus('success'), 3000);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-10 text-center animate-in zoom-in duration-300">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white mb-8 shadow-2xl shadow-green-100">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-2">Paiement Réussi</h2>
        <p className="text-gray-500 text-sm mb-10 leading-relaxed">
          Le propriétaire a été notifié. Vos accès et contrats seront disponibles dans votre boîte de réception HOUZ.
        </p>
        <button onClick={() => navigate('/')} className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl">Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 pb-32">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-2 bg-gray-50 rounded-xl"><ChevronLeft size={20} /></button>
        <h1 className="text-xl font-black text-gray-900">Finaliser la location</h1>
      </header>

      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-xl shadow-gray-50 mb-8">
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Récapitulatif</p>
          <div className="bg-indigo-50 px-3 py-1 rounded-full text-[10px] font-black text-indigo-600 uppercase">HOUZ Pay</div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Loyer mensuel</span>
            <span className="font-black text-gray-900">{amount.toLocaleString()} FCFA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 font-medium">Commission HOUZ (5%)</span>
            <span className="font-black text-indigo-600">+{commission.toLocaleString()} FCFA</span>
          </div>
          <div className="h-px bg-gray-50" />
          <div className="flex justify-between text-lg">
            <span className="font-black text-gray-900">Total à payer</span>
            <span className="font-black text-amber-500">{total.toLocaleString()} FCFA</span>
          </div>
        </div>
      </div>

      <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4 ml-1">Mode de Paiement</h3>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button 
          onClick={() => setMethod('MTN')}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${method === 'MTN' ? 'border-amber-400 bg-amber-50' : 'border-gray-50 bg-gray-50 grayscale opacity-60'}`}
        >
          <div className="w-12 h-12 bg-amber-400 rounded-xl flex items-center justify-center text-white font-black">MTN</div>
          <span className="text-[10px] font-black uppercase">Mobile Money</span>
        </button>
        <button 
          onClick={() => setMethod('ORANGE')}
          className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 ${method === 'ORANGE' ? 'border-orange-500 bg-orange-50' : 'border-gray-50 bg-gray-50 grayscale opacity-60'}`}
        >
          <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center text-white font-black">OM</div>
          <span className="text-[10px] font-black uppercase">Orange Money</span>
        </button>
      </div>

      {method && (
        <div className="animate-in slide-in-from-bottom duration-300">
           <div className="space-y-2 mb-8">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Numéro {method}</label>
            <input placeholder="6XX XX XX XX" className="w-full p-4 bg-gray-50 border-none rounded-2xl font-black text-lg text-center tracking-widest" />
          </div>
          <button 
            onClick={handlePay}
            disabled={status === 'processing'}
            className="w-full bg-indigo-900 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
          >
            {status === 'processing' ? <Loader2 className="animate-spin" /> : <Smartphone size={20} />}
            Confirmer le Paiement
          </button>
        </div>
      )}

      <div className="mt-8 flex items-center justify-center gap-2 text-gray-400">
        <ShieldCheck size={14} />
        <span className="text-[10px] font-black uppercase tracking-widest">Transaction sécurisée SSL</span>
      </div>
    </div>
  );
};

export default PaymentView;
