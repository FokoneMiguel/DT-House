
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Mic, MicOff, Sparkles, Volume2, X } from 'lucide-react';
import { connectConcierge, decodeAudioData, decodeBase64, encodeBase64 } from '../services/gemini';
import { LiveServerMessage } from '@google/genai';

const ConciergeView: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [status, setStatus] = useState('Prêt à vous aider');
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const inputAudioContextRef = useRef<AudioContext | null>(null);
  const sessionRef = useRef<any>(null);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const nextStartTimeRef = useRef(0);

  const startSession = async () => {
    try {
      setStatus('Connexion...');
      
      // Initialize audio contexts
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      }
      if (!inputAudioContextRef.current) {
        inputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = connectConcierge({
        onopen: () => {
          setIsActive(true);
          setIsListening(true);
          setStatus('Je vous écoute...');
          
          // Micro streaming logic
          const source = inputAudioContextRef.current!.createMediaStreamSource(stream);
          const processor = inputAudioContextRef.current!.createScriptProcessor(4096, 1, 1);
          
          processor.onaudioprocess = (e) => {
            const inputData = e.inputBuffer.getChannelData(0);
            const int16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              int16[i] = inputData[i] * 32768;
            }
            const base64 = encodeBase64(new Uint8Array(int16.buffer));
            sessionPromise.then(session => {
              session.sendRealtimeInput({ media: { data: base64, mimeType: 'audio/pcm;rate=16000' } });
            });
          };

          source.connect(processor);
          processor.connect(inputAudioContextRef.current!.destination);
        },
        onmessage: async (message: LiveServerMessage) => {
          // Handle audio response
          const audioBase64 = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
          if (audioBase64 && audioContextRef.current) {
            const ctx = audioContextRef.current;
            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
            
            const buffer = await decodeAudioData(decodeBase64(audioBase64), ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = buffer;
            source.connect(ctx.destination);
            source.addEventListener('ended', () => sourcesRef.current.delete(source));
            source.start(nextStartTimeRef.current);
            nextStartTimeRef.current += buffer.duration;
            sourcesRef.current.add(source);
            setStatus('Réponse en cours...');
          }

          if (message.serverContent?.interrupted) {
            sourcesRef.current.forEach(s => s.stop());
            sourcesRef.current.clear();
            nextStartTimeRef.current = 0;
          }

          if (message.serverContent?.turnComplete) {
            setStatus('Je vous écoute...');
          }
        },
        onerror: (e) => {
          console.error('Session error:', e);
          setStatus('Erreur de connexion');
        },
        onclose: () => {
          setIsActive(false);
          setStatus('Session terminée');
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error(err);
      setStatus('Erreur micro');
    }
  };

  const stopSession = () => {
    sessionRef.current?.close();
    setIsActive(false);
    setIsListening(false);
    setStatus('Au revoir !');
  };

  useEffect(() => {
    return () => stopSession();
  }, []);

  return (
    <div className="flex flex-col h-full bg-indigo-900 text-white overflow-hidden">
      <div className="px-6 py-8 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 bg-white/10 rounded-xl">
          <ChevronLeft size={24} />
        </button>
        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-400" size={18} />
          <span className="text-sm font-bold tracking-widest uppercase">Concierge IA</span>
        </div>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-10 text-center relative">
        {/* Animated Background Orbs */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600 rounded-full blur-[80px] opacity-40 transition-transform duration-1000 ${isActive ? 'scale-150' : 'scale-100'}`}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-500 rounded-full blur-[60px] opacity-30 transition-transform duration-700 delay-200 ${isActive ? 'scale-125' : 'scale-100'}`}></div>

        <div className="z-10 mb-12">
          <div className={`w-32 h-32 rounded-full border-4 border-indigo-400/30 flex items-center justify-center relative transition-all duration-500 ${isActive ? 'scale-110 border-indigo-400' : ''}`}>
            {isActive && (
              <div className="absolute inset-0 rounded-full border-4 border-indigo-400 animate-ping opacity-20"></div>
            )}
            <div className={`w-24 h-24 rounded-full bg-indigo-500 flex items-center justify-center shadow-2xl transition-all ${isActive ? 'bg-indigo-400' : 'bg-indigo-600'}`}>
              <Volume2 size={40} className={isActive ? 'animate-bounce' : ''} />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black mb-4 z-10">{isActive ? 'Besoin d\'aide ?' : 'Parlez à l\'IA'}</h2>
        <p className="text-indigo-200 text-sm font-medium z-10 opacity-80 leading-relaxed max-w-xs">
          {isActive ? status : 'Cliquez sur le micro pour démarrer une recherche vocale intelligente.'}
        </p>
      </div>

      <div className="p-12 flex justify-center z-10">
        {!isActive ? (
          <button 
            onClick={startSession}
            className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-white/10 active:scale-90 transition-transform group"
          >
            <Mic size={32} strokeWidth={3} className="group-hover:scale-110 transition-transform" />
          </button>
        ) : (
          <button 
            onClick={stopSession}
            className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/20 active:scale-90 transition-transform"
          >
            <MicOff size={32} strokeWidth={3} />
          </button>
        )}
      </div>

      <div className="pb-10 px-8 text-center opacity-40 text-[10px] font-bold uppercase tracking-widest">
        Propulsé par Gemini 2.5 Flash
      </div>
    </div>
  );
};

export default ConciergeView;
