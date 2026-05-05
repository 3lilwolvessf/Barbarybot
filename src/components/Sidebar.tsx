/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Settings, RefreshCcw, ScrollText, Binary, MessageSquare, Map as MapIcon } from 'lucide-react';
import { ChatConfig } from '../types.ts';

interface SidebarProps {
  config: ChatConfig;
  setConfig: (config: ChatConfig) => void;
  onReset: () => void;
  status: { mode: string; status: string };
  currentView: 'chat' | 'map';
  setView: (view: 'chat' | 'map') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ config, setConfig, onReset, status, currentView, setView }) => {
  const isPuterAvailable = !!(window as any).puter;

  return (
    <div className="w-full h-full p-6 md:p-8 flex flex-col items-center justify-center gap-12 overflow-y-auto no-scrollbar scroll-smooth md:pt-32 md:pr-28">
      <div className="grid grid-cols-1 gap-12 w-full max-w-xs">
        {/* Navigation */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-4 justify-center">
            <button 
              onClick={() => setView('chat')}
              className={`py-4 px-8 flex items-center gap-4 transition-all rounded-full border-2 ${
                currentView === 'chat' 
                  ? 'bg-[#c5a059] border-[#2c2c2c] text-[#2c2c2c] shadow-lg' 
                  : 'bg-white/50 border-[#2c2c2c]/10 opacity-60 hover:opacity-100'
              }`}
            >
              <MessageSquare size={20} />
              <span className="font-bold uppercase tracking-widest text-[10px]">Chat</span>
            </button>
            <button 
              onClick={() => setView('map')}
              className={`py-4 px-8 flex items-center gap-4 transition-all rounded-full border-2 ${
                currentView === 'map' 
                  ? 'bg-[#c5a059] border-[#2c2c2c] text-[#2c2c2c] shadow-lg' 
                  : 'bg-white/50 border-[#2c2c2c]/10 opacity-60 hover:opacity-100'
              }`}
            >
              <MapIcon size={20} />
              <span className="font-bold uppercase tracking-widest text-[10px]">Map</span>
            </button>
          </div>
        </div>

        {/* Inference Settings */}
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-6 font-mono text-[10px]">
             <div className="flex justify-between items-center bg-white/40 p-4 border border-[#2c2c2c]/10 rounded-xl w-64">
                <span className="font-bold uppercase">Free LLM</span>
                <button 
                  onClick={() => setConfig({ ...config, usePuter: !(config as any).usePuter } as any)}
                  className={`w-10 h-5 rounded-full relative transition-colors ${ (config as any).usePuter ? 'bg-[#c5a059]' : 'bg-black/20' }`}
                >
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${ (config as any).usePuter ? 'left-5.5' : 'left-0.5'}`}></div>
                </button>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-[#c5a059]/30">
        <button 
          onClick={onReset}
          className="w-full py-5 bg-[#2c2c2c] text-[#f4f1ea] border-b-4 border-[#c5a059] hover:bg-[#c5a059] hover:text-[#2c2c2c] hover:border-[#2c2c2c] transition-all font-bold flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-sm shadow-xl"
        >
          <RefreshCcw size={20} />
          Clear Registry
        </button>
      </div>
    </div>
  );
};
