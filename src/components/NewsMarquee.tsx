/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

const HEADLINES = [
  "--- THE MORNING CALL: NEW PALACE HOTEL PREDICTED TO BE GRANDEST IN THE WORLD ---",
  "--- SAN FRANCISCO EXAMINER: MAYOR SCHMITZ DEBATES NEW HIGH-PRESSURE WATER SYSTEM FOR DOWNTOWN ---",
  "--- THE BULLETIN: CABLE CAR SYSTEM EXPANDS TO OUTER RICHMOND ---",
  "--- CHRONICLE: NOB HILL RESIDENTS CELEBRATE COMPLETION OF MAGNIFICENT STANFORD MANSION ---",
  "--- DAILY NEWS: FERRY BUILDING CLOCK PROVED ACCURATE TO THE SECOND AFTER LATEST REPAIRS ---",
  "--- PACIFIC ADVERTISER: RECORD CROWDS AT SUTRO BATHS AS WARM SPELL CONTINUES ---",
  "--- THE ARGONAUT: SAN FRANCISCO OPENS ITS HEARTS AND PURSES TO DISTRESSED ITALIANS ---"
];

export const NewsMarquee: React.FC = () => {
  return (
    <div className="bg-white border-y-2 border-black/5 h-12 flex items-center overflow-hidden whitespace-nowrap z-50 relative pointer-events-auto">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
        className="flex gap-24 text-black font-mono text-sm uppercase tracking-[0.2em] pl-8 items-center font-bold"
      >
        {/* Repeat headlines for seamless loop */}
        {[...HEADLINES, ...HEADLINES, ...HEADLINES].map((headline, i) => (
          <span key={i}>{headline}</span>
        ))}
      </motion.div>
    </div>
  );
};
