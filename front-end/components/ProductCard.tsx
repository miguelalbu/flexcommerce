'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/context/CartContext';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      <Link href={`/produto/${product.id}`}>
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="mb-2">
          <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>
        
        <Link href={`/produto/${product.id}`}>
          <h3 className="text-lg font-semibold text-neutral-800 mb-2 group-hover:text-primary-700 transition-colors duration-200">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-neutral-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary-700">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-primary-700 hover:bg-primary-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-200 hover:shadow-md"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm font-medium">Adicionar</span>
          </button>
        </div>
      </div>
    </div>
  );
}