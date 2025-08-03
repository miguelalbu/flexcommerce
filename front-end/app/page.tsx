'use client';

import Link from 'next/link';
import Image from 'next/image';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowRight, Star, Shield, Truck, Award } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 bg-hero-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-neutral-800 leading-tight">
                  Descubra Sua
                  <span className="text-primary-700 block">Fragrância Perfeita</span>
                </h1>
                <p className="text-xl text-neutral-600 mt-6 max-w-lg">
                  Encontre os melhores perfumes e fragrâncias premium com qualidade garantida e entrega rápida em todo o Brasil.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/produtos"
                  className="bg-primary-700 hover:bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  <span>Ver Produtos</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <button className="border-2 border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200">
                  Saiba Mais
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg"
                  alt="Perfumes Premium"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold text-neutral-800">4.9/5</span>
                </div>
                <p className="text-sm text-neutral-600">+1000 avaliações</p>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-primary-700 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">50%</p>
                <p className="text-sm">de desconto</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Entrega Rápida</h3>
              <p className="text-neutral-600">Receba seus produtos em até 3 dias úteis em todo o Brasil</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Compra Segura</h3>
              <p className="text-neutral-600">Seus dados protegidos com certificação SSL e pagamento seguro</p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary-700" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-2">Qualidade Premium</h3>
              <p className="text-neutral-600">Produtos originais com qualidade garantida e certificada</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Produtos em Destaque
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Descubra nossa seleção especial de perfumes mais populares e bem avaliados
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              href="/produtos"
              className="inline-flex items-center space-x-2 bg-primary-700 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
            >
              <span>Ver Todos os Produtos</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Receba Nossas Ofertas Especiais
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Seja o primeiro a saber sobre promoções exclusivas e novos produtos
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-primary-300 focus:outline-none"
            />
            <button className="bg-secondary-200 hover:bg-secondary-300 text-primary-800 px-6 py-3 rounded-lg font-semibold transition-colors duration-200">
              Inscrever-se
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}