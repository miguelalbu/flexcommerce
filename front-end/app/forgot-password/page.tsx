'use client';

import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Mail, Loader2, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPassword() {
  // Estado para armazenar o valor do email do formulário
  const [email, setEmail] = useState('');
  // Estado para controlar o estado de carregamento do botão
  const [loading, setLoading] = useState(false);
  // Estado para armazenar a mensagem de feedback para o usuário
  const [message, setMessage] = useState('');
  // Estado para indicar se a mensagem é um erro ou um sucesso
  const [isError, setIsError] = useState(false);

  // Inicializa o cliente Supabase
  const supabase = createClientComponentClient();

  // Função para lidar com a submissão do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // Chama a função do Supabase para enviar o e-mail de recuperação
      // Certifique-se de configurar a URL de redirecionamento no seu painel do Supabase.
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/update-password`,
      });

      if (error) {
        throw error;
      }

      setMessage('Um link de recuperação de senha foi enviado para o seu e-mail.');
    } catch (error: any) {
      setMessage(error.message || 'Ocorreu um erro ao enviar o e-mail.');
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl">
        <div className="text-center">
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Esqueceu a senha?</h2>
          <p className='mt-2 text-sm text-gray-600'>Informe seu e-mail para receber um link de recuperação.</p>
        </div>

        {/* O 'form' agora está dentro da div principal */}
        <form onSubmit={handleSubmit} className='mt-8 space-y-6'>
          <div className='relative'>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id='email'
              name='email'
              type="email"
              required
              className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && (
            <div
              className={`flex items-center space-x-2 text-sm text-center font-medium py-2 rounded-md ${
                isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {isError ? (
                <XCircle className="h-5 w-5 ml-2" />
              ) : (
                <CheckCircle className="h-5 w-5 ml-2" />
              )}
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Enviando...
              </>
            ) : (
              'Enviar Link de Recuperação'
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          <Link href="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Lembrou da sua senha? Volte para o login
          </Link>
        </p>
      </div>
    </div>
  );
}