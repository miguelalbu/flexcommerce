'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ArrowLeft, User, Phone, CheckCircle, XCircle, Loader2, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

// Define a interface para os dados do formulário
interface UserProfileData {
  name: string;
  phone: string;
}

export default function DadosPerfilPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Estados para os dados do formulário
  const [formData, setFormData] = useState<UserProfileData>({
    name: '',
    phone: '',
  });

  // Novos estados para e-mail e senha
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  // Estado para o status de carregamento e mensagens
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Hook para buscar os dados do usuário ao carregar a página
  useEffect(() => {
    async function getUserData() {
      // Tenta obter a sessão do usuário
      const { data: { session }, error } = await supabase.auth.getSession();

      // Se não houver sessão ou houver erro, redireciona para o login
      if (!session || error) {
        console.error('Nenhuma sessão encontrada. Redirecionando para o login.');
        router.push('/login');
        return;
      }

      // Extrai os dados do perfil da sessão
      const user = session.user;
      const userMetadata = user.user_metadata;

      // Preenche o formulário com os dados existentes
      setFormData({
        name: userMetadata.name || '',
        phone: userMetadata.phone || '',
      });
      // Preenche o e-mail com o valor da sessão
      setEmail(user.email || '');
      setLoading(false);
    }

    getUserData();
  }, [router, supabase]);

  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Função para lidar com a submissão do formulário
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setMessage('');

    try {
      // Objeto de dados para atualização
      const updates: { data?: object; email?: string; password?: string } = {
        data: {
          name: formData.name,
          phone: formData.phone,
        },
      };

      // Se o campo de email não estiver vazio e for diferente do atual, adiciona ao objeto de atualização
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (email && email !== currentUser?.email) {
        updates.email = email;
      }

      // Verifica e valida a nova senha
      if (newPassword) {
        if (newPassword !== confirmNewPassword) {
          throw new Error('As novas senhas não coincidem.');
        }
        updates.password = newPassword;
      }

      const { data, error } = await supabase.auth.updateUser(updates);

      if (error) {
        throw error;
      }

      if (updates.email) {
        setMessage('E-mail atualizado com sucesso! Por favor, verifique seu novo e-mail para confirmar a alteração.');
      } else if (updates.password) {
        setMessage('Senha atualizada com sucesso!');
      } else {
        setMessage('Dados do perfil atualizados com sucesso!');
      }
      setIsError(false);

      // Limpa os campos de senha após a atualização
      setNewPassword('');
      setConfirmNewPassword('');

      router.refresh();

    } catch (error: any) {
      setMessage(error.message || 'Erro ao atualizar os dados.');
      setIsError(true);
    } finally {
      setUpdating(false);
    }
  };

  // Exibe um estado de carregamento inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
        <p className="ml-4 text-xl font-semibold text-neutral-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/perfil"
          className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-600 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o Perfil</span>
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-neutral-900">Editar Dados do Perfil</h1>
            <p className="text-neutral-600 mt-2">Atualize suas informações pessoais, e-mail e senha.</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-6">
            {/* Campo Nome */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            {/* Campo Telefone */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Telefone (opcional)"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <hr className="border-t border-gray-200" />

            {/* Campo Email */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <hr className="border-t border-gray-200" />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-neutral-800">Alterar Senha</h2>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Nova senha (mínimo 6 caracteres)"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                  className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Confirme a nova senha"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
              </div>
            </div>

            {/* Mensagem de feedback */}
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

            {/* Botão de submissão */}
            <button
              type="submit"
              disabled={updating}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  Atualizando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}