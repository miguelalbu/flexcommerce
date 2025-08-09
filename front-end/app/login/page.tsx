'use client';

import { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  // Estados para campos comuns de login/registro
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  // Estados adicionais para registro
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados para feedback do usuário
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  // Função para limpar os estados
  const clearFields = () => {
    setEmail('');
    setPassword('');
    setName('');
    setPhone('');
    setConfirmPassword('');
    setMessage('');
    setIsError(false);
  };

  // Função para alternar a visualização de login/cadastro
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    clearFields(); // Limpa os campos e mensagens ao trocar de tela
  };

  // Função de manipulação do formulário
  const handleAuth = (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    // Simulação de delay para a requisição
    setTimeout(() => {
      if (isLoginView) {
        // Lógica de Login
        setMessage('Login simulado bem-sucedido!');
        setIsError(false);
      } else {
        // Lógica de Registro
        if (password !== confirmPassword) {
          setMessage('As senhas não coincidem!');
          setIsError(true);
          setLoading(false);
          return;
        }
        setMessage('Cadastro simulado bem-sucedido!');
        setIsError(false);
      }
      setLoading(false);
      clearFields();
    }, 1500); // 1.5 segundos de delay
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-xl">
        {/* Cabeçalho do formulário */}
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isLoginView ? 'Bem-vindo de volta!' : 'Crie sua conta'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLoginView ? 'Novo por aqui? ' : 'Já tem uma conta? '}
            <button
              onClick={toggleView}
              className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
            >
              {isLoginView ? 'Criar uma conta' : 'Fazer login'}
            </button>
          </p>
        </div>

        {/* Formulário */}
        <form className="mt-8 space-y-4" onSubmit={handleAuth}>
          <div className="rounded-md shadow-sm">
            {!isLoginView && (
              <>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    required
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Nome completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="relative -mt-px">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Telefone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="relative -mt-px">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className={`appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm ${
                  isLoginView
                    ? 'rounded-t-md'
                    : name && phone
                    ? ''
                    : 'rounded-t-md'
                }`}
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative -mt-px">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                className={`appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm ${
                  isLoginView ? 'rounded-b-md' : ''
                }`}
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!isLoginView && (
              <div className="relative -mt-px">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  className="appearance-none rounded-b-md relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                  placeholder="Confirme sua senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            )}
          </div>
          
          {/* Mensagens de feedback */}
          {message && (
            <div
              className={`text-sm text-center font-medium py-2 rounded-md ${
                isError ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
              }`}
            >
              {message}
            </div>
          )}

          {/* Botão de submissão */}
          <Link href="/perfil">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Criar conta')}
            </button>
          </Link>

          {/* Link para recuperação de senha */}
          {isLoginView && (
            <div className="text-sm text-center">
              <Link href="/forgot-password" className="text-primary-600 hover:text-primary-500">
                Esqueceu sua senha?
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
