import React, { useState } from 'react';
import { Sparkles, X, Loader2, Send } from 'lucide-react';
import { generateRomanticText } from '../services/geminiService';

interface AIAssistantProps {
  onSelect: (text: string) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    const text = await generateRomanticText(prompt, 'poem');
    setResult(text);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 group"
        title="Need inspiration?"
      >
        <Sparkles size={20} className="group-hover:animate-spin" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden ring-1 ring-white/50">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <Sparkles size={18} />
                <h3 className="font-semibold">Cupid's Assistant (AI)</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-stone-600">
                Stuck on words? Tell me what you want to convey (e.g., "her smile", "our first trip"), and I'll write a short poem for you.
              </p>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., Walking in the rain..."
                  className="flex-1 border border-stone-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                />
                <button
                  onClick={handleGenerate}
                  disabled={loading || !prompt}
                  className="bg-indigo-500 text-white rounded-lg px-4 py-2 disabled:opacity-50 hover:bg-indigo-600 transition-colors"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>

              {result && (
                <div className="bg-stone-50 p-4 rounded-lg border border-stone-100 mt-4 relative group">
                  <p className="handwritten text-xl text-stone-800 leading-relaxed text-center">
                    {result}
                  </p>
                  <button
                    onClick={() => {
                      onSelect(result);
                      setIsOpen(false);
                      setPrompt('');
                      setResult('');
                    }}
                    className="mt-3 w-full bg-stone-800 text-white text-xs py-2 rounded uppercase tracking-wider hover:bg-stone-700 transition-colors"
                  >
                    Use this Text
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
