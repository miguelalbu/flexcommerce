'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getProductById } from '@/data/products';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart, Heart, Share2, Star, Truck, Shield, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProdutoPage() {
  const params = useParams();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  
  const product = getProductById(params.id as string);
  
  if (!product) {
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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
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

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-2 rounded-full ${
                    isFavorite 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white text-neutral-600 hover:text-red-500'
                  } shadow-md transition-colors duration-200`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button className="p-2 bg-white text-neutral-600 hover:text-primary-700 rounded-full shadow-md transition-colors duration-200">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-8">
              <div className="mb-4">
                <span className="text-sm text-primary-600 font-medium bg-primary-50 px-3 py-1 rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-neutral-800 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-neutral-600">(127 avaliações)</span>
              </div>

              <p className="text-neutral-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Price */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-primary-700">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                <span className="text-neutral-500 ml-2 line-through">
                  R$ {(product.price * 1.2).toFixed(2).replace('.', ',')}
                </span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center border border-neutral-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-600 hover:text-primary-700"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-neutral-600 hover:text-primary-700"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-700 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors duration-200 hover:shadow-lg"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Adicionar ao Carrinho</span>
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-neutral-200">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Truck className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Frete Grátis</p>
                    <p className="text-sm text-neutral-600">Acima de R$ 99,00</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="bg-primary-100 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary-700" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-800">Garantia</p>
                    <p className="text-sm text-neutral-600">30 dias para troca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}