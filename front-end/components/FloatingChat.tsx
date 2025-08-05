// components/FloatingChat.tsx

'use client';

import { useState, FormEvent, useEffect, useRef } from 'react';
import { Sparkles, X, MessageSquareText, Bot, User } from 'lucide-react';

// Tipagem para as mensagens
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Olá! Sou seu assistente de IA. Estou aqui para te ajudar a encontrar o perfume perfeito ou tirar dúvidas sobre nossos produtos.',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll para o final da conversa
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user' as const,
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userMessage.text }),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição da API de backend.');
      }

      const data = await response.json();
      
      const botMessage = {
        id: messages.length + 2,
        text: data.response,
        sender: 'bot' as const,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Erro ao buscar resposta da IA:', error);
      const errorMessage = {
        id: messages.length + 2,
        text: 'Desculpe, ocorreu um erro. Tente novamente mais tarde.',
        sender: 'bot' as const,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl border border-primary-100 flex flex-col w-80 h-[400px] animate-fade-in">
          <div className="bg-primary-700 text-white p-4 rounded-t-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <span className="font-semibold">Assistente de IA</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-primary-600 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-sm">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {message.sender === 'bot' && <Bot className="h-6 w-6 text-primary-700 mt-1" />}
                <div className={`max-w-[80%] p-3 rounded-xl shadow-md ${message.sender === 'user' ? 'bg-primary-100 text-neutral-800' : 'bg-neutral-200 text-neutral-800'}`}>
                  {message.text}
                </div>
                {message.sender === 'user' && <User className="h-6 w-6 text-neutral-700 mt-1" />}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-xl shadow-md bg-neutral-200 text-neutral-800 animate-pulse">
                  Digitando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-3 border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta..."
              className="flex-1 p-2 rounded-full border border-neutral-300 text-sm focus:outline-none focus:ring-2 focus:ring-primary-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-primary-700 text-white p-2 rounded-full hover:bg-primary-600 transition-colors disabled:bg-neutral-400"
              disabled={!input.trim() || isLoading}
            >
              <MessageSquareText className="h-5 w-5" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-primary-700 text-white p-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200"
        >
          <Sparkles className="h-8 w-8" />
        </button>
      )}
    </div>
  );
}