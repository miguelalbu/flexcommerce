'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Product } from '@/lib/types/product';


export default function ProdutosPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  
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

  const getCategories = () => {
    return Array.from(new Set(products.map(product => product.category)));
  };
  
  const filteredProducts = products
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product => 
      selectedCategory === '' || product.category === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return <div className="text-center mt-10">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <main className="container mx-auto p-8">
      {/* Header e Subtítulo */}
      <h1 className="text-4xl font-bold text-center mb-10 text-primary-700">Nossos Produtos</h1>
      <p className="text-lg text-center text-neutral-600 mb-8">
        Explore nossa coleção completa de perfumes e fragrâncias premium
      </p>

      {/* Filtros e Busca */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Campo de Busca */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Filtro de Categoria */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">Todas as categorias</option>
            {getCategories().map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name">Ordenar por nome</option>
            <option value="price-low">Menor preço</option>
            <option value="price-high">Maior preço</option>
          </select>
        </div>
      </div>
      
      {/* Mensagem de Quantidade de Produtos */}
      <div className="mb-6">
        <p className="text-neutral-600">
          Mostrando {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Grid de Produtos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-semibold text-neutral-800 mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-neutral-600">
            Tente ajustar os filtros ou termos de busca
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <Link href={`/produtos/${product.id}`} key={product.id} className="block">
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-xl" />
                ) : (
                  <div className="w-full h-48 bg-neutral-200 flex items-center justify-center rounded-t-xl">
                    <span className="text-neutral-500">Sem Imagem</span>
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-neutral-800">{product.name}</h2>
                  <p className="text-sm text-neutral-600 mt-1">{product.brand} - {product.category}</p>
                  <p className="text-xl font-bold text-primary-700 mt-3">R$ {product.price.toFixed(2)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}