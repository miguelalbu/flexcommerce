'use client';

import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const { state } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-primary-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-bold text-primary-700 hover:text-primary-600 transition-colors duration-200"
          >
            FlexCommerce
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-neutral-700 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Início
            </Link>
            <Link 
              href="/produtos" 
              className="text-neutral-700 hover:text-primary-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Produtos
            </Link>
          </nav>
          
          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link 
              href="/carrinho" 
              className="relative p-2 text-neutral-700 hover:text-primary-700 transition-colors duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-700 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-neutral-700 hover:text-primary-700 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-in">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <Link 
                href="/" 
                className="block text-neutral-700 hover:text-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Início
              </Link>
              <Link 
                href="/produtos" 
                className="block text-neutral-700 hover:text-primary-700 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Produtos
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}