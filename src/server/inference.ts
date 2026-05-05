/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { Message, MessageRole, ChatConfig, ChatRequest } from "../types.ts";
import { STUB_RESPONSES, SYSTEM_PROMPT } from "../constants.ts";

export interface InferenceProvider {
  name: string;
  generate(request: ChatRequest): Promise<ReadableStream<string>>;
}

export class StubProvider implements InferenceProvider {
  name = "stub";

  async generate(request: ChatRequest): Promise<ReadableStream<string>> {
    const response = STUB_RESPONSES[Math.floor(Math.random() * STUB_RESPONSES.length)];
    const tokens = response.split(" ");
    
    return new ReadableStream({
      async start(controller) {
        for (const token of tokens) {
          controller.enqueue(token + " ");
          await new Promise((r) => setTimeout(r, 50));
        }
        controller.close();
      },
    });
  }
}

export class GeminiProvider implements InferenceProvider {
  name = "live";
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generate(request: ChatRequest): Promise<ReadableStream<string>> {
    const modelName = process.env.BARBARYBOT_MODEL_NAME || "gemini-3-flash-preview";

    // Format for Gemini API (convert our messages to Gemini format)
    const contents = request.messages.map(m => ({
      role: m.role === MessageRole.USER ? "user" : "model",
      parts: [{ text: m.content }]
    }));
    
    return new ReadableStream({
      async start(controller) {
        try {
          const stream = await this.ai.models.generateContentStream({
            model: modelName,
            contents,
            config: {
              systemInstruction: SYSTEM_PROMPT,
              temperature: request.config?.temperature,
              topP: request.config?.topP,
              topK: request.config?.topK,
            }
          });

          for await (const chunk of stream) {
            const text = chunk.text;
            if (text) {
              controller.enqueue(text);
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });
  }
}

/**
 * Talkie-Style Local Provider Stub
 * This demonstrates how the prompt would be formatted for a local model
 */
export class LocalProvider implements InferenceProvider {
  name = "local";

  async generate(request: ChatRequest): Promise<ReadableStream<string>> {
    // Talkie Prompt Template: <|system|>...<|user|>...<|assistant|>...<|end|>
    let prompt = `<|system|>${SYSTEM_PROMPT}<|end|>\n`;
    for (const msg of request.messages) {
      prompt += `<|${msg.role}|>${msg.content}<|end|>\n`;
    }
    prompt += `<|assistant|>`;

    console.log("Local Provider Prompt Assembly:\n", prompt);

    // For this applet, since we don't have a real local GPU runner,
    // we fallback to stub but announce as local
    return new StubProvider().generate(request);
  }
}

export function getProvider(): InferenceProvider {
  const mode = process.env.BARBARYBOT_INFERENCE_MODE || "stub";
  const apiKey = process.env.GEMINI_API_KEY;

  if (mode === "live" && apiKey) {
    return new GeminiProvider(apiKey);
  }
  if (mode === "local") {
    return new LocalProvider();
  }
  return new StubProvider();
}
