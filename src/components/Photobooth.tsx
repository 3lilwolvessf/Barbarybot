import { motion, AnimatePresence } from 'motion/react';
import { X, Camera, Settings, RefreshCcw } from 'lucide-react';
import { ChatConfig } from '../types.ts';

interface PhotoboothProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChatConfig;
  setConfig: (config: ChatConfig) => void;
  onReset: () => void;
}

export const Photobooth = ({ isOpen, onClose, config, setConfig, onReset }: PhotoboothProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-2xl bg-[#f4f1ea] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#2c2c2c] flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="bg-[#2c2c2c] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Camera className="gold-accent" />
                <h2 className="font-display text-2xl uppercase tracking-widest gold-accent">San Francisco Photobooth</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto">
              {/* Camera Preview Mockup */}
              <div className="space-y-4">
                <div className="aspect-square bg-black rounded-2xl flex items-center justify-center relative overflow-hidden group">
                  <div className="absolute inset-0 border-2 border-white/20 z-10 pointer-events-none"></div>
                  <div className="text-white/20 text-xs font-mono text-center flex flex-col items-center gap-2">
                    <Camera size={48} className="opacity-10" />
                    <span>LENS CAP ENGAGED</span>
                    <span className="text-[8px] tracking-[0.3em]">DEVELOPING FILM...</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-[#c5a059] text-[#2c2c2c] rounded-xl font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2">
                    <Camera size={20} />
                    Capture Moment
                </button>
              </div>

              {/* Administrative Sidebar */}
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-black/10 pb-2">
                  <Settings size={18} className="opacity-40" />
                  <h3 className="font-display text-sm uppercase text-black/40">Administrative</h3>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <label>Creativity</label>
                      <span>{config.temperature}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="1" step="0.1"
                      value={config.temperature}
                      onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                      className="w-full accent-[#c5a059]"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase">
                      <label>Detail Level</label>
                      <span>{config.maxTokens}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" max="256" step="16"
                      value={config.maxTokens}
                      onChange={(e) => setConfig({ ...config, maxTokens: parseInt(e.target.value) })}
                      className="w-full accent-[#c5a059]"
                    />
                  </div>
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => { onReset(); onClose(); }}
                    className="w-full py-3 bg-[#2c2c2c] text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-black transition-all"
                  >
                    <RefreshCcw size={16} />
                    Clear City Registry
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white/50 text-[10px] text-center font-mono opacity-40 uppercase tracking-widest">
              Built for the San Francisco Historical Institute
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
