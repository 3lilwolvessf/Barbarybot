/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { z } from 'zod';

export const MessageRole = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant'
} as const;

export type MessageRole = (typeof MessageRole)[keyof typeof MessageRole];

export const MessageSchema = z.object({
  role: z.nativeEnum(MessageRole),
  content: z.string()
});

export type Message = z.infer<typeof MessageSchema>;

export const ChatConfigSchema = z.object({
  temperature: z.number().min(0).max(2).default(0.7),
  maxTokens: z.number().min(1).max(4096).default(512),
  topP: z.number().min(0).max(1).default(1.0),
  topK: z.number().min(1).max(100).default(40),
  stream: z.boolean().default(true)
});

export type ChatConfig = z.infer<typeof ChatConfigSchema>;

export interface ChatRequest {
  messages: Message[];
  config?: ChatConfig;
}

export type ChatResponse = {
  content: string;
  mode: 'stub' | 'local' | 'live';
};

export const ChatRequestSchema = z.object({
  messages: z.array(MessageSchema),
  config: ChatConfigSchema.optional()
});
