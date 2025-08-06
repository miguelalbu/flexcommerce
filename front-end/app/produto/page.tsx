// app/produtos/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  brand: string;
  category: string;
}

export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products');
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos da API.');
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar os produtos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-primary-700">Nossos Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map(product => (
          <Link href={`/produtos/${product.id}`} key={product.id} className="block">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-xl" />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-neutral-800">{product.name}</h2>
                <p className="text-sm text-neutral-600 mt-1">{product.brand} - {product.category}</p>
                <p className="text-xl font-bold text-primary-700 mt-3">R$ {product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}