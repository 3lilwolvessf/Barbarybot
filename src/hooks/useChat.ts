/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback } from 'react';
import { Message, MessageRole, ChatConfig } from '../types.ts';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: MessageRole.ASSISTANT,
      content: "Good morning to ya! Step inside, escape the fog. What's the word on the street? Rumors of the Mayor, or perhaps just looking for a decent bowl of cioppino?"
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string, config: ChatConfig) => {
    if (!content.trim()) return;

    const userMessage: Message = { role: MessageRole.USER, content };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Prepare assistant placeholder
    const assistantMessage: Message = { role: MessageRole.ASSISTANT, content: "" };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      // Check if we should use Puter.js (Client-Side Free LLM)
      // @ts-ignore
      if (window.puter && (config as any).usePuter) {
        // @ts-ignore
        const response = await window.puter.ai.chat(
          [
            // @ts-ignore
            { role: 'system', content: `You are BarbaryBot, a sharp-witted San Franciscan in 1906. Knowledge stops at April 18, 1906, 5:11 AM. persona: sharp, funny, skeptical of future. 1906 slang only. Tone: vintage editorial.` },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content }
          ],
          { 
            model: "claude-3-5-sonnet", // Or gpt-4o, etc.
            stream: true 
          }
        );

        let accumulatedContent = "";
        for await (const part of response) {
          if (part?.text) {
            accumulatedContent += part.text;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = {
                ...newMessages[newMessages.length - 1],
                content: accumulatedContent
              };
              return newMessages;
            });
          }
        }
        return;
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          config
        }),
      });

      if (!response.ok) throw new Error('Failed to reach the telegraph office...');

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No readable stream');

      let accumulatedContent = "";
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        accumulatedContent += chunk;
        
        // Update the last message (the assistant one)
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = {
            ...newMessages[newMessages.length - 1],
            content: accumulatedContent
          };
          return newMessages;
        });
      }
    } catch (err: any) {
      setError(err.message);
      setMessages((prev) => prev.slice(0, -1)); // Remove the empty assistant message
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const resetChat = useCallback(() => {
    setMessages([
      {
        role: MessageRole.ASSISTANT,
        content: "Reset? Back to square one then. The fog has cleared, and the city is fresh once more. What can I tell you of our fine San Francisco?"
      }
    ]);
    setError(null);
  }, []);

  return { messages, sendMessage, isLoading, error, resetChat };
}
