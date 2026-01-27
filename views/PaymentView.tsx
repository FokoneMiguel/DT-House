
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  ChevronLeft, Wallet, Smartphone, ShieldCheck, 
  CheckCircle2, Loader2, SmartphoneNfc 
} from 'lucide-react';

const PaymentView: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const amount = parseInt(params.get('amount') || '0');
  const [method, setMethod] = useState<'MTN' | 'ORANGE' | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const commission = Math.round(amount * 0.05);
  const total = amount + commission;

  const handlePay = () => {
    setStatus('processing');
    // Simulation du Webhook de paiement MoMo/Orange
    setTimeout(() => setStatus('success'), 3500);
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-12 text-center animate-in zoom-in duration-500 bg-white">
        <div className="relative mb-10">
          <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-100 animate-bounce">
            <CheckCircle2 size={64} />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-lg text-green-500">
             <ShieldCheck size={24} />
          </div>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tighter">Paiement Confirmé</h2>
        <p className="text-gray-400 text-sm mb-12 leading-relaxed font-medium">
          Le propriétaire a reçu son paiement. <br/>Vous pouvez maintenant accéder aux détails complets de la propriété et au contrat.
        </p>
        <button onClick={() => navigate('/messages')} className="w-full bg-indigo-900 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100 uppercase text-xs tracking-widest">Voir mes messages</button>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 pb-32 bg-white min-h-screen">
      <header className="flex items-center gap-4 mb-10">
        <button onClick={() => navigate(-1)} className="p-3 bg-gray-50 rounded-2xl text-gray-400"><ChevronLeft size={24} /></button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tighter">HOUZ Pay</h1>
      </header>

      <div className="bg-indigo-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-100 mb-10 relative overflow-hidden">
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-indigo-300 uppercase tracking-[0.2em] mb-4">Total de la transaction</p>
          <div className="flex items-baseline gap-2 mb-8">
            <h2 className="text-4xl font-black tracking-tighter">{total.toLocaleString()}</h2>
            <span className="text-xl font-bold opacity-40">FCFA</span>
          </div>
          
          <div className="space-y-3 pt-6 border-t border-white/10">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-indigo-300">
              <span>Loyer net</span>
              <span className="text-white">{amount.toLocaleString()} FCFA</span>
            </div>
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-indigo-300">
              <span>Frais HOUZ (5%)</span>
              <span className="text-amber-400">{commission.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>
        <SmartphoneNfc className="absolute -bottom-10 -right-10 text-white/5 w-48 h-48 rotate-12" />
      </div>

      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-6 ml-2">Moyen de paiement</h3>
      <div className="grid grid-cols-2 gap-4 mb-10">
        <button 
          onClick={() => setMethod('MTN')}
          className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${method === 'MTN' ? 'border-amber-400 bg-amber-50 shadow-xl shadow-amber-100' : 'border-gray-50 bg-gray-50 grayscale opacity-40'}`}
        >
          <div className="w-16 h-16 bg-amber-400 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">M</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-900">MTN MoMo</span>
        </button>
        <button 
          onClick={() => setMethod('ORANGE')}
          className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-4 ${method === 'ORANGE' ? 'border-orange-500 bg-orange-50 shadow-xl shadow-orange-100' : 'border-gray-50 bg-gray-50 grayscale opacity-40'}`}
        >
          <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">O</div>
          <span className="text-[10px] font-black uppercase tracking-widest text-orange-900">Orange Money</span>
        </button>
      </div>

      {method && (
        <div className="animate-in slide-in-from-bottom duration-500">
           <div className="space-y-2 mb-10">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Numéro de téléphone {method}</label>
            <input placeholder="6XX XX XX XX" className="w-full px-8 py-6 bg-gray-50 border-none rounded-[2.5rem] font-black text-2xl text-center tracking-[0.3em] text-indigo-900 shadow-inner" />
          </div>
          <button 
            onClick={handlePay}
            disabled={status === 'processing'}
            className="w-full bg-indigo-900 text-white font-black py-6 rounded-[2.5rem] shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            {status === 'processing' ? <Loader2 className="animate-spin" /> : <ShieldCheck size={24} />}
            Payer {total.toLocaleString()} FCFA
          </button>
        </div>
      )}

      <div className="mt-12 flex items-center justify-center gap-2 text-gray-300 mb-8">
        <ShieldCheck size={16} />
        <span className="text-[10px] font-black uppercase tracking-widest">Gateway sécurisé par SSL/TLS</span>
      </div>
    </div>
  );
};

export default PaymentView;
