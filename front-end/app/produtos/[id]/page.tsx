'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/lib/types/product';



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
        const response = await fetch(`/api/products/${params.id}`);
        
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

  // Lógica para adicionar ao carrinho
  const handleAddToCart = () => {
    if (product) {
      // Loop para adicionar a quantidade selecionada de produtos
      for (let i = 0; i < quantity; i++) {
        dispatch({ type: 'ADD_ITEM', payload: product });
      }
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          href="/produtos"
          className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-600 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Voltar para produtos</span>
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Imagem do Produto */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-[500px] bg-neutral-200 flex items-center justify-center">
                <span className="text-neutral-500">Imagem não disponível</span>
              </div>
            )}
          </div>

          {/* Detalhes do Produto */}
          <div className="flex flex-col">
            <h1 className="text-4xl font-extrabold text-neutral-900 mb-2">{product.name}</h1>
            <p className="text-lg text-neutral-600 mb-4">
              <span className="font-semibold text-neutral-700">{product.brand}</span> | {product.category}
            </p>
            
            <div className="flex items-center space-x-2 text-yellow-400 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
              <span className="text-neutral-500 text-sm">(4.5)</span>
            </div>

            <p className="text-2xl font-bold text-primary-700 mb-6">R$ {product.price.toFixed(2)}</p>
            
            <div className="prose text-neutral-700 mb-8">
              <p>{product.description}</p>
              {product.fragrance_notes && (
                <p className="mt-4">**Notas Olfativas:** {product.fragrance_notes}</p>
              )}
            </div>

            {/* Ações e Quantidade */}
            <div className="flex items-center space-x-4 mb-8">
              <div className="flex items-center border border-neutral-300 rounded-lg">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-900"
                >
                  -
                </button>
                <span className="px-4 py-2 text-neutral-800">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-900"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}