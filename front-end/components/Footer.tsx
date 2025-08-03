import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">FlexCommerce</h3>
            <p className="text-primary-100 mb-6 max-w-md">
              Sua loja online de confiança para os melhores perfumes e fragrâncias. 
              Qualidade premium com entrega rápida e segura.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center text-primary-100">
                <Mail className="h-4 w-4 mr-2" />
                <span className="text-sm">contato@flexcommerce.com</span>
              </div>
            </div>
          </div>
          
          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-primary-100 hover:text-white transition-colors duration-200"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  href="/produtos" 
                  className="text-primary-100 hover:text-white transition-colors duration-200"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link 
                  href="/carrinho" 
                  className="text-primary-100 hover:text-white transition-colors duration-200"
                >
                  Carrinho
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Categorias */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categorias</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-primary-100">Perfumes Masculinos</span>
              </li>
              <li>
                <span className="text-primary-100">Perfumes Femininos</span>
              </li>
              <li>
                <span className="text-primary-100">Perfumes Unissex</span>
              </li>
              <li>
                <span className="text-primary-100">Perfumes Premium</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Linha divisória e copyright */}
        <div className="border-t border-primary-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-primary-100 text-sm">
              © 2024 FlexCommerce. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-primary-100 text-sm hover:text-white cursor-pointer transition-colors duration-200">
                Política de Privacidade
              </span>
              <span className="text-primary-100 text-sm hover:text-white cursor-pointer transition-colors duration-200">
                Termos de Uso
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}