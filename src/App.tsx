/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 Google LLC
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChatInterface } from './components/ChatInterface.tsx';
import { MapViewer } from './components/MapViewer.tsx';
import { NewsMarquee } from './components/NewsMarquee.tsx';
import { SelfieGallery } from './components/SelfieGallery.tsx';
import { Photobooth } from './components/Photobooth.tsx';
import { useChat } from './hooks/useChat.ts';
import { ChatConfig } from './types.ts';

export default function App() {
  const [isPhotoboothOpen, setIsPhotoboothOpen] = useState(false);
  const [config, setConfig] = useState<ChatConfig & { usePuter?: boolean }>({
    temperature: 0.7,
    maxTokens: 512,
    topP: 1.0,
    topK: 40,
    stream: true,
    usePuter: true
  });

  const { messages, sendMessage, isLoading, resetChat } = useChat();

  const handleSendMessage = (content: string) => {
    sendMessage(content, config);
  };

  const handleAskAbout = (location: string) => {
    sendMessage(`Tell me everything you know about ${location}. Is it really as grand as they say?`, config);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#e6dfd3] p-4 lg:p-6 flex flex-col font-sans">
      
      {/* 4 Quadrant Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 h-full w-full gap-4 lg:gap-8">
        
        {/* Top Left: Chat Interface */}
        <div className="section-card bento-glass bento-mask-tl relative flex flex-col overflow-hidden">
          <div className="absolute top-3 left-0 right-0 z-20 pointer-events-none flex justify-center">
            <span className="font-display text-[#c5a059] text-base md:text-xl uppercase tracking-tighter opacity-60">The Wire Despatch</span>
          </div>
          <ChatInterface
            messages={messages}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </div>

        {/* Top Right: Gazette / News */}
        <div className="section-card bento-glass bento-mask-tr relative flex items-center justify-center p-6 pb-16 md:pb-24 pl-6 md:pl-24">
          <div className="max-w-md w-full space-y-4 text-center uppercase">
            <div className="space-y-1">
              <div className="text-[10px] opacity-40">Barbary Gazette • April 1906</div>
              <div className="h-px bg-black/10 w-full"></div>
              <h2 className="text-xl lg:text-3xl font-display text-[#2c2c2c] leading-tight">The Golden City</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[10px] tracking-widest opacity-80">
              <div className="p-3 border border-black/5 bg-white/20 rounded-2xl">
                <span className="block opacity-40 mb-1 border-b border-black/5 pb-1 text-[8px]">Cutoff</span>
                <span className="font-bold">APR 17</span>
              </div>
              <div className="p-3 border border-black/5 bg-white/20 rounded-2xl">
                <span className="block opacity-40 mb-1 border-b border-black/5 pb-1 text-[8px]">Weather</span>
                <span className="font-bold">HAZY</span>
              </div>
            </div>
            <p className="text-[10px] italic leading-relaxed opacity-60 normal-case pt-2">
              Historical records from the eve of the great disturbance.
            </p>
          </div>
        </div>

        {/* Bottom Left: Selfie Gallery */}
        <div className="section-card bento-glass bento-mask-bl relative flex flex-col pt-6 md:pt-8 overflow-hidden">
          <SelfieGallery />
        </div>

        {/* Bottom Right: Map History */}
        <div className="section-card bento-glass bento-mask-br relative flex flex-col pt-6 md:pt-8 overflow-hidden">
          <MapViewer onAskAbout={handleAskAbout} />
        </div>
      </div>

      {/* Marquee divider */}
      <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-20 pointer-events-auto">
        <NewsMarquee />
      </div>

      {/* LOGO - Trigger for Photobooth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
        <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer group"
            onClick={() => setIsPhotoboothOpen(true)}
        >
            <div className="absolute inset-0 bg-white rounded-full blur-[40px] opacity-0 group-hover:opacity-60 transition-opacity"></div>
            <div className="w-40 h-40 md:w-52 lg:w-56 lg:h-56 rounded-full border-4 border-[#2c2c2c] overflow-hidden shadow-2xl relative">
                <img 
                    src="https://ideogram.ai/assets/image/balanced/edit/_4P5wAcHRFGeVx_1MwsAgQ" 
                    alt="BarbaryBot Seal" 
                    className="w-full h-full object-cover p-2 bg-white"
                    referrerPolicy="no-referrer"
                />
            </div>
        </motion.div>
      </div>

      <Photobooth 
        isOpen={isPhotoboothOpen}
        onClose={() => setIsPhotoboothOpen(false)}
        config={config}
        setConfig={setConfig}
        onReset={resetChat}
      />

    </div>
  );
}

