'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Package, Calendar, DollarSign } from 'lucide-react';
import Link from 'next/link';

// Dados fictícios para simular pedidos de um usuário
const mockPedidos = [
  {
    id: 'P001',
    data: '2023-10-26',
    total: 150.50,
    status: 'Enviado',
    itens: [
      { nome: 'Camiseta Flex', quantidade: 1, preco: 75.50 },
      { nome: 'Calça de Moletom', quantidade: 1, preco: 75.00 },
    ],
  },
  {
    id: 'P002',
    data: '2023-10-20',
    total: 299.90,
    status: 'Entregue',
    itens: [
      { nome: 'Tênis Running X', quantidade: 1, preco: 299.90 },
    ],
  },
  {
    id: 'P003',
    data: '2023-10-15',
    total: 55.00,
    status: 'Entregue',
    itens: [
      { nome: 'Meia Esportiva', quantidade: 2, preco: 27.50 },
    ],
  },
];

export default function MeusPedidos() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // Efeito para verificar o estado de autenticação do usuário
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        // Se não houver sessão, redireciona para a página de login
        router.push('/login');
      }
      setLoading(false);
    };

    checkUser();
  }, [supabase, router]);

  if (loading) {
    // Exibe um estado de carregamento enquanto a verificação de autenticação é feita
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Package className="h-12 w-12 text-gray-500 animate-pulse" />
          <h1 className="text-xl text-gray-700">Carregando seus pedidos...</h1>
        </div>
      </div>
    );
  }

  // Se o usuário não estiver logado, a página estará em branco
  // (já que o redirecionamento acontece no useEffect)
  if (!user) {
    return null;
  }

  // Se o usuário estiver logado, exibe o conteúdo da página
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Meus Pedidos</h1>
        
        {mockPedidos.length > 0 ? (
          <div className="space-y-6">
            {mockPedidos.map((pedido) => (
              <div key={pedido.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">Pedido #{pedido.id}</h2>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    pedido.status === 'Enviado' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {pedido.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Data: {pedido.data}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Total: R$ {pedido.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-700 mb-2">Itens:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {pedido.itens.map((item, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        {item.quantidade}x {item.nome} (R$ {item.preco.toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Package className="mx-auto h-24 w-24 text-gray-300" />
            <h3 className="mt-2 text-2xl font-semibold text-gray-900">Nenhum pedido encontrado.</h3>
            <p className="mt-1 text-gray-500">Comece a fazer suas compras agora!</p>
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
