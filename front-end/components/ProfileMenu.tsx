'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { User, LogIn, UserPlus, LogOut, Heart, ShoppingCart, LayoutGrid } from 'lucide-react';

export default function ProfileMenu() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  // Estado para armazenar o objeto de usuário logado
  const [user, setUser] = useState<any>(null);
  // Estado para controlar a visibilidade do menu suspenso
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Estado para o nome do usuário para exibição
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // O 'onAuthStateChanged' é a melhor forma de ouvir mudanças de autenticação
    // Ele é executado imediatamente e sempre que o estado do usuário muda
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        // Define o nome de exibição, preferindo o nome completo ou o e-mail
        setUserName(session.user.user_metadata.name || session.user.email?.split('@')[0]);
      } else {
        setUser(null);
        setUserName('');
      }
    });

    // Limpa a assinatura do evento para evitar vazamentos de memória
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  // Função para lidar com o logout do usuário
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Adição: Fecha o menu suspenso após o logout para que ele não fique aberto
    setIsMenuOpen(false);
    // Força a revalidação da página para que o estado de autenticação seja atualizado
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-neutral-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-2 transition-all duration-200"
      >
        <User className="h-6 w-6" />

      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {user ? (
              // Menu para usuário LOGADO
              <>
                {/* O nome do usuário agora aparece apenas dentro do menu */}
                <div className="block px-4 py-2 text-sm text-gray-700">
                  Olá, <span className="font-semibold">{userName}</span>
                </div>
                <Link
                  href="/perfil"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <LayoutGrid className="mr-2 h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  Perfil
                </Link>
                <Link
                  href="/meus-pedidos"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <ShoppingCart className="mr-2 h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  Meus Pedidos
                </Link>
                <Link
                  href="/favoritos"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <Heart className="mr-2 h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  Favoritos
                </Link>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleLogout}
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <LogOut className="mr-2 h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors" />
                  Sair
                </button>
              </>
            ) : (
              // Menu para usuário DESLOGADO
              <>
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <LogIn className="mr-2 h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  Login
                </Link>
                <Link
                  href="/cadastro"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                >
                  <UserPlus className="mr-2 h-4 w-4 text-gray-400 group-hover:text-primary-600 transition-colors" />
                  Criar Conta
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}