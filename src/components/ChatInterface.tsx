/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { Send, MapPin, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Message, MessageRole } from '../types.ts';

interface ChatInterfaceProps {
  messages: Message[];
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading }) => {
  const [input, setInput] = React.useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#fdfaf5]/50 relative overflow-hidden">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pt-10 px-4 md:px-6 pb-4 space-y-6 no-scrollbar scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`flex ${msg.role === MessageRole.USER ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-5 rounded-sm shadow-md border-t-2 ${
                  msg.role === MessageRole.USER 
                    ? 'bg-[#2c2c2c] text-[#f4f1ea] border-[#c5a059] rounded-br-none' 
                    : 'bg-white text-[#2c2c2c] border-[#c5a059] rounded-bl-none'
                }`}
              >
                <div className={`text-xs uppercase font-mono mb-2 opacity-50 ${msg.role === MessageRole.USER ? 'text-right' : 'text-left'}`}>
                  {msg.role === MessageRole.USER ? 'Gentleman / Lady' : 'Barbary Citizen'}
                </div>
                <div className="leading-relaxed whitespace-pre-wrap typewriter-text">
                  {msg.content || (isLoading && i === messages.length - 1 ? <span className="animate-pulse">...</span> : '')}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Input */}
      <form 
        onSubmit={handleSubmit}
        className="p-6 bg-white border-t-2 border-[#c5a059]/30"
      >
        <div className="flex gap-4 max-w-4xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your despatch..."
            className="flex-1 p-4 border border-black/10 focus:border-[#c5a059] outline-none typewriter-text text-sm bg-white/50 shadow-inner rounded-xl"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-8 bg-[#2c2c2c] text-[#f4f1ea] gold-accent hover:text-white border-2 border-[#c5a059] transition-all disabled:opacity-50 disabled:grayscale flex items-center gap-2 uppercase tracking-widest font-bold"
          >
            Send <Send size={18} />
          </button>
        </div>
        <p className="text-center text-[10px] font-mono opacity-40 mt-3 uppercase tracking-widest leading-none">
          Careful what you ask, friend. We don't take kindly to talk of the future.
        </p>
      </form>
    </div>
  );
};
