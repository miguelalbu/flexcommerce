// app/produtos/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react'; // Importar useEffect
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Defina a interface do produto para tipagem
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  fragrance_notes: string;
  brand: string;
}

export default function ProdutoPage() {
  const params = useParams();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!params.id) return;
      
      try {
        const response = await fetch(`http://localhost:3001/api/products/${params.id}`);
        
        if (!response.ok) {
          throw new Error('Produto não encontrado.');
        }
        
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        console.error(err);
        setError('Não foi possível carregar o produto.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [params.id]);

  // Handle loading and error states
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-medium text-neutral-800">Carregando...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">Produto não encontrado</h1>
          <Link 
            href="/produtos"
            className="text-primary-700 hover:text-primary-600 font-medium"
          >
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  // A partir daqui, o restante do seu código pode ser usado,
  // mas com as referências corrigidas para o objeto 'product'
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ... Resto do seu código com as propriedades do objeto 'product' ... */}
        <div className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link href="/" className="hover:text-primary-700">Início</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-primary-700">Produtos</Link>
          <span>/</span>
          <span className="text-neutral-800">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link 
          href="/produtos"
          className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-600 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para produtos</span>
        </Link>
        
        {/* ... Restante do código ... */}
      </div>
    </div>
  );
}