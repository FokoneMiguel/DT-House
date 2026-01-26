
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ImageIcon, 
  Wand2, 
  Camera, 
  Layout, 
  Maximize,
  AlertCircle,
  Key
} from 'lucide-react';
import { generateDreamHome, editPropertyImage, analyzePropertyImage } from '../services/gemini';

const AIEnhanceView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generate' | 'edit' | 'analyze'>('generate');
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageSize, setImageSize] = useState('1K');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hasApiKey, setHasApiKey] = useState(true);

  // Vérifie si une clé a été sélectionnée pour les modèles Pro (Veo/Imagen)
  useEffect(() => {
    const checkKey = async () => {
      if (window.aistudio?.hasSelectedApiKey) {
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkKey();
  }, [activeTab]);

  const handleOpenKeyDialog = async () => {
    if (window.aistudio?.openSelectKey) {
      await window.aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsProcessing(true);
    setError(null);
    try {
      const img = await generateDreamHome(prompt, aspectRatio, imageSize);
      setResultImage(img);
    } catch (err: any) {
      if (err?.message?.includes("Requested entity was not found")) {
        setHasApiKey(false);
        setError("Projet payant requis. Veuillez sélectionner une clé valide.");
      } else {
        setError("Erreur lors de la génération. Vérifiez votre connexion.");
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, mode: 'edit' | 'analyze') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setAnalysisResult(null);

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      try {
        if (mode === 'edit') {
          const edited = await editPropertyImage(base64, "Transform this house to look modern and luxurious with sunset lighting");
          setResultImage(edited);
        } else {
          const analysis = await analyzePropertyImage(base64);
          setAnalysisResult(analysis);
          setResultImage(base64);
        }
      } catch (err) {
        setError("Erreur de traitement.");
      } finally {
        setIsProcessing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="px-6 py-8 pb-32">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
          Immo<span className="text-indigo-600">AI</span> Lab
          <Sparkles className="text-indigo-600" size={24} />
        </h1>
        <p className="text-gray-500 text-sm mt-1">Puissance créative pour votre projet immobilier</p>
      </header>

      <div className="flex bg-gray-100 p-1.5 rounded-2xl mb-8">
        {(['generate', 'edit', 'analyze'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setResultImage(null);
              setAnalysisResult(null);
              setError(null);
            }}
            className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-tight ${activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-400'}`}
          >
            {tab === 'generate' ? 'Générer' : tab === 'edit' ? 'Éditer' : 'Analyser'}
          </button>
        ))}
      </div>

      {!hasApiKey && activeTab === 'generate' ? (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-indigo-100 text-center animate-in fade-in zoom-in duration-300">
          <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <Key size={32} />
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">Clé API requise</h3>
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Pour utiliser la génération d'images haute qualité (Imagen 3), vous devez sélectionner une clé API liée à un projet GCP payant.
            <br />
            <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-indigo-600 font-bold underline">En savoir plus sur la facturation</a>
          </p>
          <button 
            onClick={handleOpenKeyDialog}
            className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-2"
          >
            <Key size={20} />
            Sélectionner ma clé
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {activeTab === 'generate' && (
            <div className="space-y-6 animate-in slide-in-from-right duration-300">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Logement de rêve</label>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ex: Villa moderne en bord de mer avec piscine à débordement..."
                  className="w-full p-4 bg-white border border-gray-100 rounded-2xl min-h-[120px] text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                    <Layout size={12} /> Format
                  </label>
                  <select 
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-100 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    <option value="16:9">Paysage (16:9)</option>
                    <option value="9:16">Portrait (9:16)</option>
                    <option value="1:1">Carré (1:1)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase flex items-center gap-1">
                    <Maximize size={12} /> Qualité
                  </label>
                  <select 
                    value={imageSize}
                    onChange={(e) => setImageSize(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-100 rounded-xl text-xs font-bold focus:outline-none"
                  >
                    <option value="1K">HD (1K)</option>
                    <option value="2K">Retina (2K)</option>
                    <option value="4K">Ultra (4K)</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={isProcessing || !prompt}
                className="w-full bg-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Wand2 size={20} />
                    Générer mon image
                  </>
                )}
              </button>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="text-center py-10 animate-in slide-in-from-right duration-300">
              <div className="bg-white border-2 border-dashed border-indigo-200 rounded-3xl p-8 mb-6">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ImageIcon className="text-indigo-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Amélioration IA</h3>
                <p className="text-xs text-gray-400 mb-6">Changez le style d'une photo de logement instantanément.</p>
                <label className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl cursor-pointer">
                  Choisir une photo
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'edit')} />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'analyze' && (
            <div className="text-center py-10 animate-in slide-in-from-right duration-300">
              <div className="bg-white border-2 border-dashed border-indigo-200 rounded-3xl p-8 mb-6">
                <div className="bg-indigo-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="text-indigo-600" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Analyse d'Annonce</h3>
                <p className="text-xs text-gray-400 mb-6">Laissez l'IA rédiger la description de votre bien.</p>
                <label className="inline-block bg-indigo-600 text-white font-bold px-6 py-3 rounded-xl cursor-pointer">
                  Analyser un bien
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'analyze')} />
                </label>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-xs font-bold">{error}</p>
            </div>
          )}

          {resultImage && (
            <div className="mt-8 space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-4 ring-indigo-50">
                <img src={resultImage} alt="AI Result" className="w-full object-cover" />
                <button className="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg">
                  <Sparkles size={20} className="text-indigo-600" />
                </button>
              </div>
              
              {analysisResult && (
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Wand2 size={16} className="text-indigo-600" /> Description suggérée
                  </h4>
                  <p className="text-sm text-gray-600 leading-relaxed italic">"{analysisResult}"</p>
                </div>
              )}
              
              <button className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl shadow-lg">Enregistrer</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AIEnhanceView;
