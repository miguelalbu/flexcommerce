'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { HeartOff, Trash2, Heart } from 'lucide-react';
import Link from 'next/link';

// Define a tipagem para o objeto de produto
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

// Define a tipagem para o objeto de favorito, que inclui o produto
interface Favorite {
  id: string;
  product: Product;
}

export default function Favoritos() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Função assíncrona para buscar os favoritos do usuário na API
  const fetchFavorites = async () => {
    try {
      const response = await fetch('/api/favorites');
      if (!response.ok) {
        throw new Error('Falha ao buscar favoritos.');
      }
      const data = await response.json();
      setFavorites(data.favorites);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      // Você pode adicionar um tratamento de erro mais amigável aqui
    } finally {
      setLoading(false);
    }
  };

  // Efeito para verificar o estado de autenticação e carregar os favoritos
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        // Só busca os favoritos se o usuário estiver logado
        fetchFavorites();
      } else {
        router.push('/login');
      }
    };
    checkUser();
  }, [supabase, router]);

  // Função para remover um item dos favoritos através da API
  const handleRemoveFavorite = async (productId: string) => {
    try {
      // Faz a requisição DELETE para a nossa API de favoritos
      const response = await fetch('/api/favorites', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) {
        throw new Error('Falha ao remover favorito.');
      }

      // Se a remoção foi bem-sucedida, atualiza o estado local
      // removendo o produto da lista sem precisar recarregar a página
      setFavorites(favorites.filter(fav => fav.product.id !== productId));
      console.log(`Produto com ID ${productId} removido dos favoritos.`);
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Heart className="h-12 w-12 text-gray-500 animate-pulse" />
          <h1 className="text-xl text-gray-700">Carregando seus favoritos...</h1>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Meus Favoritos</h1>

        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((fav) => (
              <div key={fav.product.id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-200 hover:scale-105">
                <div className="relative">
                  <img src={fav.product.image_url} alt={fav.product.name} className="w-full h-48 object-cover" />
                  <button
                    onClick={() => handleRemoveFavorite(fav.product.id)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg text-red-500 hover:text-red-600 transition-colors"
                    aria-label={`Remover ${fav.product.name} dos favoritos`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{fav.product.name}</h2>
                  <p className="mt-1 text-sm text-gray-600 line-clamp-2">{fav.product.description}</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">R$ {fav.product.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <HeartOff className="mx-auto h-24 w-24 text-gray-300" />
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">Nenhum favorito encontrado.</h3>
            <p className="mt-1 text-gray-500">Adicione produtos que você amou para vê-los aqui!</p>
            <div className="mt-6">
              <Link
                href="/produtos"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Ver Produtos
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}