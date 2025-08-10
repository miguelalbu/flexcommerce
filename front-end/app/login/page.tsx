'use client';

import { useState } from 'react';
import { Mail, Lock, User, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

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
  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setIsError(false);

    try {
      if (isLoginView) {
        // Chamada para API de login
        const res = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          setMessage(data.message || 'Erro ao fazer login');
          setIsError(true);
        } else {
          setMessage('Login realizado com sucesso!');
          setIsError(false);
          clearFields();
          router.push('/perfil');
        }
      } else {
        // Validação de senha
        if (password !== confirmPassword) {
          setMessage('As senhas não coincidem!');
          setIsError(true);
          setLoading(false);
          return;
        }
        // Chamada para API de cadastro
        const res = await fetch('http://localhost:3001/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone, email, password }),
        });
        const data = await res.json();
        if (!res.ok) {
          // Verifica se o erro é de e-mail já cadastrado
          if (data.message && data.message.toLowerCase().includes('already registered')) {
            setMessage('Este e-mail já está cadastrado. Faça login ou recupere sua senha.');
          } else if (data.message && data.message.toLowerCase().includes('already exists')) {
            setMessage('Este e-mail já está cadastrado. Faça login ou recupere sua senha.');
          } else {
            setMessage(data.message || 'Erro ao cadastrar');
          }
          setIsError(true);
        } else {
          setMessage('Cadastro realizado com sucesso!');
          setIsError(false);
          clearFields();
          router.push('/perfil');
        }
      }
    } catch (error) {
      setMessage('Erro de conexão com o servidor');
      setIsError(true);
    }
    setLoading(false);
  };

  // Função para login/cadastro com Google
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google';
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

        {/* Botão de login/cadastro com Google */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 font-medium hover:bg-gray-100 transition-all duration-200 mb-2"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
            <g>
              <path
                fill="#4285F4"
                d="M43.611 20.083H42V20H24v8h11.303C33.962 32.083 29.418 35 24 35c-6.065 0-11-4.935-11-11s4.935-11 11-11c2.507 0 4.813.857 6.661 2.278l6.366-6.366C33.527 6.527 28.977 5 24 5 12.954 5 4 13.954 4 25s8.954 20 20 20c11.046 0 20-8.954 20-20 0-1.341-.138-2.651-.389-3.917z"
              />
              <path
                fill="#34A853"
                d="M6.306 14.691l6.571 4.819C14.655 16.108 19.004 13 24 13c2.507 0 4.813.857 6.661 2.278l6.366-6.366C33.527 6.527 28.977 5 24 5c-7.732 0-14.41 4.388-17.694 10.691z"
              />
              <path
                fill="#FBBC05"
                d="M24 43c5.315 0 10.13-1.824 13.885-4.941l-6.438-5.271C29.418 35 24 35 24 35c-5.418 0-9.962-2.917-11.303-7.083l-6.571 4.819C9.59 38.612 16.268 43 24 43z"
              />
              <path
                fill="#EA4335"
                d="M43.611 20.083H42V20H24v8h11.303C34.62 32.254 29.418 35 24 35c-5.418 0-9.962-2.917-11.303-7.083l-6.571 4.819C9.59 38.612 16.268 43 24 43c7.732 0 14.41-4.388 17.694-10.691z"
              />
            </g>
          </svg>
          Entrar com Google
        </button>

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
          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed "
          >
            {loading ? 'Carregando...' : (isLoginView ? 'Entrar' : 'Criar conta')}
          </button>

          {/* Link para recuperação de senha */}
          {isLoginView && (
            <div className="text-sm text-center">
              <a href="/forgot-password" className="text-primary-600 hover:text-primary-500">
                Esqueceu sua senha?
              </a>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
