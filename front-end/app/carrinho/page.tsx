'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function CarrinhoPage() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="bg-neutral-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="h-12 w-12 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            Seu carrinho está vazio
          </h1>
          <p className="text-neutral-600 mb-8">
            Adicione alguns produtos incríveis ao seu carrinho e volte aqui para finalizar sua compra.
          </p>
          <Link 
            href="/produtos"
            className="inline-flex items-center space-x-2 bg-primary-700 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            <span>Continuar Comprando</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Carrinho de Compras
          </h1>
          <p className="text-neutral-600">
            {state.items.length} ite{state.items.length !== 1 ? 'ns' : 'm'} no seu carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-neutral-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-neutral-800">
                    Itens do Carrinho
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Limpar Carrinho
                  </button>
                </div>
              </div>

              <div className="divide-y divide-neutral-200">
                {state.items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-neutral-800 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-neutral-600 mb-2">
                          {item.category}
                        </p>
                        <p className="text-lg font-bold text-primary-700">
                          R$ {item.price.toFixed(2).replace('.', ',')}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-neutral-300 rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-neutral-600 hover:text-primary-700"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-2 min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-neutral-600 hover:text-primary-700"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/produtos"
              className="inline-flex items-center space-x-2 text-primary-700 hover:text-primary-600 mt-6 font-medium"
            >
              <span>← Continuar Comprando</span>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-neutral-800 mb-6">
                Resumo do Pedido
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">
                    R$ {state.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Frete</span>
                  <span className="font-medium text-green-600">Grátis</span>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-neutral-800">Total</span>
                    <span className="text-2xl font-bold text-primary-700">
                      R$ {state.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </div>

              <Link 
                href="/checkout"
                className="w-full bg-primary-700 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold text-center block transition-colors duration-200 hover:shadow-lg"
              >
                Finalizar Compra
              </Link>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Compra 100% segura e protegida
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}