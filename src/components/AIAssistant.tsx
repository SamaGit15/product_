/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Bot, Loader2, MessageSquareText, Sparkles, User, X } from 'lucide-react';
import { Button } from './UIElements';

interface AIAssistantProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
}

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;
const MAX_HISTORY_MESSAGES = 12;

const quickPrompts = [
  'What services do you offer for businesses?',
  'Which portfolio project is best for healthcare?',
  'I have a long automation idea. Can you help me shape the next step?'
];

const pageAliases: Record<string, string[]> = {
  services: ['service', 'services', 'offer', 'offering', 'assistant', 'automation', 'analytics', 'software'],
  portfolio: ['portfolio', 'project', 'case study', 'work', 'showcase'],
  blog: ['blog', 'article', 'articles', 'insight', 'insights'],
  events: ['event', 'events', 'webinar', 'summit'],
  contact: ['contact', 'consultation', 'quote', 'meeting', 'schedule', 'talk', 'call'],
  home: ['home', 'homepage']
};

const getSuggestedPage = (input: string) => {
  const normalized = input.toLowerCase();
  return Object.entries(pageAliases).find(([, aliases]) => aliases.some((alias) => normalized.includes(alias)))?.[0];
};

const getPageLabel = (page: string) =>
  page === 'blog'
    ? 'Articles'
    : page.charAt(0).toUpperCase() + page.slice(1);

const buildHistoryPayload = (messages: Message[]) =>
  messages
    .filter((message) => message.role === 'assistant' || message.role === 'user')
    .slice(-MAX_HISTORY_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content
    }));

export const AIAssistant: React.FC<AIAssistantProps> = ({
  currentPage,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: createId(),
      role: 'assistant',
      content:
        'Hi, I am the AI assistant for AI-Solutions. Ask about services, portfolio projects, articles, events, or how to contact the team.'
    }
  ]);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, isLoading]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = '0px';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  }, [input]);

  const submitPrompt = async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed || isLoading) return;

    const userMessage: Message = { id: createId(), role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    const suggestedPage = getSuggestedPage(trimmed);

    try {
      const response = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          currentPage,
          history: buildHistoryPayload(messages)
        })
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => ({}))) as { message?: string };
        throw new Error(payload.message || 'Assistant request failed.');
      }

      const payload = (await response.json()) as { reply?: string };
      let reply = payload.reply?.trim() || 'I could not generate a reply just now.';

      if (suggestedPage && suggestedPage !== currentPage) {
        reply = `${reply}\n\nI can also take you to the ${getPageLabel(suggestedPage)} page if that helps.`;
      }

      setMessages((current) => [
        ...current,
        { id: createId(), role: 'assistant', content: reply }
      ]);
    } catch (error) {
      console.error('AI assistant request failed.', error);
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content:
            error instanceof Error
              ? `${error.message}\n\nPlease make sure the Vercel environment includes a valid GEMINI_API_KEY.`
              : 'The assistant is unavailable right now. Please check the Gemini API configuration.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitPrompt(input);
  };

  const handleTextareaKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void submitPrompt(input);
    }
  };

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 flex max-w-[calc(100vw-1.5rem)] flex-col items-stretch gap-3 sm:inset-x-auto sm:bottom-5 sm:right-5 sm:max-w-[min(94vw,420px)] sm:items-end">
      {isOpen && (
        <div className="flex h-[min(560px,calc(100dvh-5rem))] w-full max-w-full flex-col overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,36,67,0.18)] sm:h-[min(620px,calc(100dvh-6rem))]">
          <div className="shrink-0 bg-[linear-gradient(135deg,#0f2443_0%,#1B4F72_55%,#2E86DE_100%)] px-4 py-3 text-white sm:px-5 sm:py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Bot className="h-5 w-5 text-sky-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold">AI Virtual Assistant</p>
                  <p className="text-xs text-brand-100">
                    Gemini-powered, context-aware site assistant
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-brand-100 transition hover:bg-white/10 hover:text-white"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={viewportRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-slate-50 px-4 py-3 sm:py-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-ocean-blue">
                    <Sparkles className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={`max-w-[84%] min-w-0 rounded-3xl px-4 py-3 text-sm leading-7 ${
                    message.role === 'user'
                      ? 'bg-ocean-blue text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words [overflow-wrap:anywhere]">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-brand-50 text-ocean-blue">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-ocean-blue" />
                    Reading your request and site context...
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-3">
            <div className="mb-3 hidden flex-wrap gap-2 sm:flex">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => void submitPrompt(prompt)}
                  className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-medium text-ocean-blue transition hover:border-brand-200 hover:bg-brand-100"
                >
                  {prompt}
                </button>
              ))}
              <button
                onClick={() => onNavigate('contact')}
                className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Open Contact Page
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={handleTextareaKeyDown}
                rows={1}
                placeholder="Ask about services, projects, events, articles, or paste a detailed business need..."
                className="min-h-[44px] max-h-[120px] w-full resize-none rounded-2xl border border-slate-200 px-4 py-2.5 text-sm leading-6 text-slate-800 outline-none transition focus:border-ocean-blue focus:ring-2 focus:ring-brand-100"
              />
              <div className="flex items-center justify-between gap-3">
                <p className="hidden text-xs text-slate-400 sm:block">
                  Press Enter to send. Use Shift+Enter for a new line.
                </p>
                <Button type="submit" size="md" icon="Send" disabled={!input.trim() || isLoading}>
                  Send
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((open) => !open)}
        className="group ml-auto flex items-center gap-3 rounded-full bg-[linear-gradient(135deg,#1B4F72_0%,#2E86DE_100%)] px-5 py-4 text-white shadow-[0_20px_50px_rgba(27,79,114,0.28)] transition hover:scale-[1.02]"
        aria-label="Open AI assistant"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/14">
          {isOpen ? <X className="h-5 w-5" /> : <MessageSquareText className="h-5 w-5" />}
        </div>
        <div className="text-left">
          <p className="text-sm font-semibold">Virtual Assistant</p>
          <p className="text-xs text-brand-100">Ask AI-Solutions anything</p>
        </div>
      </button>
    </div>
  );
};
