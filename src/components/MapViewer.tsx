/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Info, X, MessageSquareText, Box } from 'lucide-react';
import { City3D } from './City3D.tsx';

interface Hotspot {
  id: string;
  name: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
  fact: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'ferry',
    name: 'Ferry Building',
    description: 'The pulse of the city.',
    x: 88,
    y: 44,
    fact: "Completed in 1898, its clock tower is modeled after the Giralda bell tower in Seville. It's where every visitor first sets foot on our fine peninsula."
  },
  {
    id: 'palace',
    name: 'Palace Hotel',
    description: 'The Golden Tower of Luxury.',
    x: 75,
    y: 52,
    fact: "The largest and most luxurious hotel in the West! It has its own well system and a massive glass-roofed Garden Court where the city's elite dine."
  },
  {
    id: 'chinatown',
    name: 'Chinatown',
    description: 'A City Within a City.',
    x: 74,
    y: 38,
    fact: "Spanning several blocks along Grant and Stockton, it is the largest Chinese enclave outside of Asia. The smells of incense and dried fish fill the air."
  },
  {
    id: 'cliff',
    name: 'Cliff House',
    description: 'Sentinel of the West.',
    x: 5,
    y: 45,
    fact: "Perched on the rocks above the Pacific. Adolph Sutro's magnificent Victorian masterpiece. Watch the seal rocks from the veranda!"
  },
  {
    id: 'barbary',
    name: 'Barbary Coast',
    description: 'The Devil\'s Quarter.',
    x: 78,
    y: 32,
    fact: "Pacific Avenue is lined with dance halls and 'melodeons'. Careful you don't get 'shanghaied' into a crew for a Pacific voyage!"
  },
  {
    id: 'nob',
    name: 'Nob Hill',
    description: 'Home of the Nabobs.',
    x: 65,
    y: 40,
    fact: "Where the Big Four—Stanford, Hopkins, Crocker, and Huntington—built their wooden palaces. The cable cars are the only way to reach these heights."
  }
];

interface MapViewerProps {
  onAskAbout: (location: string) => void;
}

export const MapViewer: React.FC<MapViewerProps> = () => {
  return (
    <div className="flex-1 h-full bg-[#f4f1ea] overflow-hidden relative paper-texture flex flex-col no-scrollbar">
      <iframe 
        src="https://sf-street-history.seldo.vercel.app/street/0" 
        className="w-full h-full border-none grayscale-[0.2] sepia-[0.1]"
        title="SF Street History"
      />
    </div>
  );
};
