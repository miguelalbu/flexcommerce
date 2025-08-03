'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import { CreditCard, Truck, Shield, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular processamento do pedido
    setTimeout(() => {
      setIsProcessing(false);
      setOrderCompleted(true);
      dispatch({ type: 'CLEAR_CART' });
    }, 3000);
  };

  if (state.items.length === 0 && !orderCompleted) {
    router.push('/carrinho');
    return null;
  }

  if (orderCompleted) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
          <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-4">
            Pedido Confirmado!
          </h1>
          <p className="text-neutral-600 mb-6">
            Seu pedido foi processado com sucesso. Você receberá um e-mail de confirmação em breve.
          </p>
          <button
            onClick={() => router.push('/')}
            className="w-full bg-primary-700 hover:bg-primary-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200"
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Finalizar Compra
          </h1>
          <p className="text-neutral-600">
            Complete seus dados para finalizar o pedido
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Informações de Contato
                </h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Endereço de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Nome"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Sobrenome"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div className="mt-4 space-y-4">
                  <input
                    type="text"
                    name="address"
                    placeholder="Endereço completo"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="Cidade"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="CEP"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div>
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Informações de Pagamento
                </h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Número do cartão"
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/AA"
                      required
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      required
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Nome no cartão"
                    required
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary-700 hover:bg-primary-600 disabled:bg-neutral-400 text-white py-4 px-6 rounded-lg font-semibold transition-colors duration-200 hover:shadow-lg"
              >
                {isProcessing ? 'Processando...' : 'Finalizar Pedido'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                Resumo do Pedido
              </h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-neutral-800">{item.name}</h3>
                      <p className="text-sm text-neutral-600">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-neutral-800">
                      R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-neutral-200 mt-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-neutral-800">Total</span>
                  <span className="text-2xl font-bold text-primary-700">
                    R$ {state.total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-neutral-800 mb-4">
                Compra Segura
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-neutral-700">Dados protegidos com SSL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-neutral-700">Pagamento 100% seguro</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-neutral-700">Entrega garantida</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}