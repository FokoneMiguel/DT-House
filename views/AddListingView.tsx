
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Plus, 
  X, 
  Image as ImageIcon, 
  Sparkles, 
  Wand2, 
  CheckCircle2,
  Camera
} from 'lucide-react';
import { analyzePropertyImage } from '../services/gemini';
import { Property, PropertyType, Furnishing, StayDuration, User } from '../types';

interface AddListingViewProps {
  onAdd: (property: Property) => void;
  owner: User; // Added owner prop to resolve App.tsx error
}

const AddListingView: React.FC<AddListingViewProps> = ({ onAdd, owner }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImages(prev => [...prev, event.target!.result as string].slice(0, 5));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleAIAnalyze = async () => {
    if (images.length === 0) return;
    setIsAnalyzing(true);
    try {
      // Use the first image for analysis
      const result = await analyzePropertyImage(images[0]);
      setDescription(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !city || images.length === 0) return;

    setIsSubmitting(true);
    
    // Fixed: Updated property creation to match Property interface exactly
    const newProperty: Property = {
      id: Date.now().toString(),
      title,
      description: description || "Aucune description fournie.",
      price: parseInt(price),
      currency: '€',
      city,
      country: 'France',
      neighborhood: 'Centre',
      type: PropertyType.APPARTEMENT,
      furnishing: Furnishing.MEUBLE,
      duration: StayDuration.LONG,
      imageUrl: images[0],
      images: images,
      ownerId: owner.id,
      ownerName: owner.name,
      ownerAvatar: owner.avatar,
      isRented: false
    };

    setTimeout(() => {
      onAdd(newProperty);
      setIsSubmitting(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="px-6 py-8 pb-32">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Nouvelle annonce</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Multi-photo Upload Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-end">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Galerie photos</h2>
              <p className="text-[10px] text-gray-400 font-medium">Ajoutez jusqu'à 5 photos de votre bien</p>
            </div>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
              {images.length}/5
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {images.map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm border border-gray-100">
                <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                <button 
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
                {idx === 0 && (
                  <div className="absolute bottom-0 left-0 right-0 bg-indigo-600/80 backdrop-blur-sm text-white text-[8px] font-bold text-center py-1 uppercase tracking-widest">
                    Principale
                  </div>
                )}
              </div>
            ))}
            
            {images.length < 5 && (
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all text-gray-400 hover:text-indigo-500"
              >
                <div className="p-2 bg-gray-50 rounded-xl group-hover:bg-indigo-100 transition-colors">
                  <Plus size={20} />
                </div>
                <span className="text-[10px] font-bold">Ajouter</span>
              </button>
            )}
          </div>
          <input 
            type="file" 
            className="hidden" 
            multiple 
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </section>

        {/* AI Description Generator */}
        {images.length > 0 && (
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-3xl border border-indigo-100 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2.5 rounded-2xl shadow-sm">
                <Sparkles size={18} className="text-indigo-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">L'IA peut rédiger votre annonce</p>
                <p className="text-[10px] text-gray-500 font-medium">Analyse visuelle en un clic</p>
              </div>
            </div>
            <button 
              type="button"
              onClick={handleAIAnalyze}
              disabled={isAnalyzing}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-200 flex items-center gap-2 active:scale-95 transition-all disabled:opacity-50"
            >
              {isAnalyzing ? (
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Wand2 size={14} />
              )}
              Rédiger
            </button>
          </div>
        )}

        {/* Property Details Form */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Titre de l'annonce</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Studio moderne au centre-ville"
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-800 placeholder:text-gray-300 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Prix (€/mois)</label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Ville</label>
              <input 
                type="text" 
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Paris..."
                className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl font-bold text-gray-800 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre bien en détail..."
              className="w-full px-5 py-4 bg-white border border-gray-100 rounded-2xl font-medium text-gray-800 min-h-[120px] focus:ring-4 focus:ring-indigo-100 transition-all outline-none resize-none"
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting || !title || !price || !city || images.length === 0}
          className="w-full bg-indigo-600 text-white font-black py-5 rounded-3xl shadow-xl shadow-indigo-100 flex items-center justify-center gap-3 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Publication...</span>
            </>
          ) : (
            <>
              <CheckCircle2 size={22} />
              <span>Publier l'annonce</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddListingView;