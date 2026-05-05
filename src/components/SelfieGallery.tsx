import { motion } from 'motion/react';

const SELFIES = [
  'https://images.unsplash.com/photo-1582218080075-817ea81ed748?q=80&w=400&fit=crop', // Historical SF vibe
  'https://images.unsplash.com/photo-1541995221376-7935409b6264?q=80&w=400&fit=crop', // Vintage group
  'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400&fit=crop', // Old street
  'https://images.unsplash.com/photo-1551239618-6bb6be672e81?q=80&w=400&fit=crop', // Historical figure
];

export const SelfieGallery = () => {
  return (
    <div className="w-full h-full px-4 pb-4 overflow-hidden flex flex-col gap-3">
      <h3 className="font-display text-base md:text-lg text-center uppercase tracking-widest text-black/40 pt-2 flex-shrink-0">Selfie Gallery 1906</h3>
      <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto no-scrollbar">
        {SELFIES.map((src, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.05 }}
            className="aspect-square bg-white border border-black/10 p-2 shadow-sm rounded-lg"
          >
            <img 
              src={src} 
              alt={`Historical Selfie ${i}`} 
              className="w-full h-full object-cover grayscale brightness-90 sepia-[0.3]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
