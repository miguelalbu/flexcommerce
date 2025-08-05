// app/help/page.tsx

'use client';

import { useState, FormEvent } from 'react'; // Importe FormEvent
import { Sparkles, Send, Bot } from 'lucide-react';

export default function HelpPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Olá! Sou seu assistente de IA. Estou aqui para te ajudar a encontrar o perfume perfeito ou responder a qualquer dúvida sobre nossas fragrâncias. Como posso te ajudar hoje?',
      sender: 'bot',
    },
  ]);
  const [input, setInput] = useState('');

  // Adicione o tipo 'FormEvent' ao parâmetro 'e'
  const handleSendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const newMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);
    setInput('');
    // Futuramente, você conectará a lógica da sua IA aqui
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: 'Obrigado por sua pergunta! Em breve, uma IA inteligente estará conectada para te dar uma resposta personalizada.',
          sender: 'bot',
        },
      ]);
    }, 1000);
  };

  return (
    <main className="bg-neutral-50 min-h-screen p-8 md:p-16">
      <div className="container mx-auto max-w-4xl">
        <section className="text-center mb-12 animate-fade-in">
          <Sparkles className="h-12 w-12 text-primary-700 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary-700 mb-2">
            Seu Assistente de Fragrâncias
          </h1>
          <p className="text-lg text-neutral-600">
            Converse com nossa inteligência artificial para encontrar a fragrância ideal. Tire dúvidas sobre ingredientes, ocasiões de uso e muito mais.
          </p>
        </section>

        <section className="bg-white rounded-xl shadow-lg border-2 border-primary-100 flex flex-col h-[70vh]">
          <div className="bg-primary-700 text-white p-4 rounded-t-lg flex items-center gap-4">
            <Bot className="h-8 w-8" />
            <h2 className="text-xl font-semibold">Assistente de IA</h2>
          </div>

          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] p-3 rounded-xl shadow-md ${
                    message.sender === 'user'
                      ? 'bg-primary-100 text-neutral-800'
                      : 'bg-neutral-200 text-neutral-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-neutral-200 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua pergunta aqui..."
              className="flex-1 p-3 rounded-full border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-700 transition-all duration-200"
            />
            <button
              type="submit"
              className="bg-primary-700 text-white p-3 rounded-full hover:bg-primary-600 transition-colors duration-200 disabled:bg-neutral-400"
              disabled={!input.trim()}
            >
              <Send className="h-6 w-6" />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}