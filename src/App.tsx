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
      
      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 h-full w-full">

        {/* Left Column: 3 stacked sections */}
        <div className="md:col-span-1 flex flex-col gap-4 lg:gap-6">
          {/* Left Top: Small */}
          <div className="section-card bento-glass relative flex-1 min-h-32 overflow-hidden flex items-center justify-center">
            <div className="text-center text-xs opacity-60 uppercase tracking-widest">Gallery</div>
          </div>

          {/* Left Middle: Medium */}
          <div className="section-card bento-glass relative flex-1 min-h-40 overflow-hidden">
            <SelfieGallery />
          </div>

          {/* Left Bottom: Large */}
          <div className="section-card bento-glass relative flex-[1.5] min-h-48 overflow-hidden flex items-center justify-center">
            <div className="text-center text-xs opacity-60 uppercase tracking-widest">Additional</div>
          </div>
        </div>

        {/* Center-Left Column: 2 sections */}
        <div className="md:col-span-1 flex flex-col gap-4 lg:gap-6">
          {/* Top: Large */}
          <div className="section-card bento-glass relative flex-[1.3] min-h-40 overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs opacity-40 mb-2">WIRE SERVICE</div>
              <div className="font-display text-lg text-[#c5a059]">News Feed</div>
            </div>
          </div>

          {/* Bottom: Small */}
          <div className="section-card bento-glass relative flex-1 min-h-24 overflow-hidden flex items-center justify-center">
            <div className="text-center text-xs opacity-60 uppercase tracking-widest">Archives</div>
          </div>
        </div>

        {/* Center Circle + Chat Column: Chat spans multiple rows */}
        <div className="md:col-span-1 md:row-span-2 flex flex-col gap-4 lg:gap-6 md:gap-0">
          {/* Chat Interface - takes full height on desktop */}
          <div className="section-card bento-glass relative flex-1 overflow-hidden flex flex-col min-h-64">
            <div className="absolute top-3 left-0 right-0 z-20 pointer-events-none flex justify-center">
              <span className="font-display text-[#c5a059] text-base md:text-lg uppercase tracking-tighter opacity-60">Despatch</span>
            </div>
            <ChatInterface
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Center-Right Column: 2 sections */}
        <div className="md:col-span-1 flex flex-col gap-4 lg:gap-6">
          {/* Top: Small */}
          <div className="section-card bento-glass relative flex-1 min-h-24 overflow-hidden flex items-center justify-center">
            <div className="text-center text-xs opacity-60 uppercase tracking-widest">Telegraph</div>
          </div>

          {/* Bottom: Large */}
          <div className="section-card bento-glass relative flex-[1.3] min-h-40 overflow-hidden flex items-center justify-center">
            <div className="text-center">
              <div className="text-xs opacity-40 mb-2">GAZETTE</div>
              <div className="font-display text-lg text-[#c5a059]">Headlines</div>
            </div>
          </div>
        </div>

        {/* Right Column: 2 sections */}
        <div className="md:col-span-1 flex flex-col gap-4 lg:gap-6">
          {/* Top: Medium */}
          <div className="section-card bento-glass relative flex-1 min-h-32 overflow-hidden">
            <div className="p-4 flex flex-col items-center justify-center h-full text-center">
              <div className="text-[10px] opacity-40 mb-2">Barbary Gazette • April 1906</div>
              <h2 className="text-lg font-display text-[#2c2c2c] mb-3">The Golden City</h2>
              <div className="grid grid-cols-2 gap-2 w-full text-[8px]">
                <div className="p-2 border border-black/5 bg-white/20 rounded-lg">
                  <span className="block opacity-40 mb-1 text-[7px]">Cutoff</span>
                  <span className="font-bold">APR 17</span>
                </div>
                <div className="p-2 border border-black/5 bg-white/20 rounded-lg">
                  <span className="block opacity-40 mb-1 text-[7px]">Weather</span>
                  <span className="font-bold">HAZY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Large */}
          <div className="section-card bento-glass relative flex-[1.5] min-h-48 overflow-hidden">
            <MapViewer onAskAbout={handleAskAbout} />
          </div>
        </div>
      </div>

      {/* LOGO - Trigger for Photobooth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 md:z-50">
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

