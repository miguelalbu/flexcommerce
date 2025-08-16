'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, User, ShoppingBag, Heart, LogOut } from 'lucide-react';
import Link from 'next/link';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

interface UserProfile {
  name: string;
  email: string;
}

export default function PerfilPage() {
  // Estado para armazenar os dados do usuário e o status de carregamento
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const supabase = createClientComponentClient();

  // Função para buscar os dados do usuário
  useEffect(() => {
    async function getUser() {
      // Obtém a sessão do usuário
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Se não houver sessão ou houver um erro, redireciona para a página de login
      if (!session || error) {
        console.error('Nenhuma sessão encontrada. Redirecionando para o login.');
        router.push('/login');
        return;
      }

      // Extrai os dados do perfil da sessão
      const user = session.user;
      const name = user.user_metadata.name || 'Usuário';
      const email = user.email || 'Email não disponível';

      // Atualiza o estado com os dados do usuário
      setUserProfile({ name, email });
      setIsLoading(false);
    }

    getUser();
  }, [router, supabase]);

  // Função para lidar com o logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Após o logout, redireciona para a página inicial
    router.push('/');
  };
  
  // Exibe um estado de carregamento enquanto busca os dados do usuário
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <p className="text-xl font-semibold text-neutral-600">Carregando...</p>
      </div>
    );
  }

  // Se não houver perfil do usuário (caso raro, mas para segurança), retorna null
  if (!userProfile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-600 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para o início</span>
        </Link>
        
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center justify-center w-20 h-20 bg-neutral-200 text-neutral-500 rounded-full">
              <User className="h-10 w-10" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-neutral-900">{userProfile.name}</h1>
              <p className="text-neutral-600">{userProfile.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Seção Meus Pedidos */}
            <div className="bg-neutral-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">Meus Pedidos</h2>
                <ShoppingBag className="h-6 w-6 text-primary-700" />
              </div>
              <p className="text-neutral-600">
                Acompanhe o status dos seus pedidos, visualize o histórico de compras e faça o rastreamento.
              </p>
              <Link href="/pedidos" className="mt-4 inline-block text-primary-600 hover:text-primary-500 font-medium">
                Ver todos os pedidos
              </Link>
            </div>

            {/* Seção Dados do Perfil */}
            <div className="bg-neutral-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">Dados do Perfil</h2>
                <User className="h-6 w-6 text-primary-700" />
              </div>
              <p className="text-neutral-600">
                Gerencie suas informações pessoais, endereços de entrega e formas de pagamento.
              </p>
              <Link href="/perfil/dados" className="mt-4 inline-block text-primary-600 hover:text-primary-500 font-medium">
                Editar perfil
              </Link>
            </div>

            {/* Seção Favoritos */}
            <div className="bg-neutral-100 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-neutral-800">Favoritos</h2>
                <Heart className="h-6 w-6 text-primary-700" />
              </div>
              <p className="text-neutral-600">
                Revise a sua lista de produtos favoritos para encontrar rapidamente o que você ama.
              </p>
              <Link href="/favoritos" className="mt-4 inline-block text-primary-600 hover:text-primary-500 font-medium">
                Ver favoritos
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-neutral-200">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-red-500 hover:text-red-600 font-medium"
            >
              <LogOut className="h-5 w-5" />
              <span>Sair da conta</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
