// /app/about/page.tsx

import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="bg-neutral-50 text-neutral-800 p-8 md:p-16">
      {/* Seção principal de Introdução */}
      <section className="container mx-auto text-center mb-16 animate-fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-primary-700 mb-4">
          Nossa História
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-neutral-600">
          Bem-vindo à FlexCommerce, o seu destino para uma experiência olfativa única. Acreditamos que um perfume é mais do que uma fragrância; é uma extensão da sua identidade, uma memória em forma de essência.
        </p>
      </section>

      {/* Seção de Missão e Valores */}
      <section className="container mx-auto grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="order-2 md:order-1 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
            Nossa Missão
          </h2>
          <p className="text-lg text-neutral-600 mb-4">
            Em um mundo de escolhas infinitas, a FlexCommerce nasceu com uma missão simples: simplificar a busca pelo seu perfume ideal. Oferecemos uma curadoria cuidadosa de fragrâncias que combinam qualidade, originalidade e sustentabilidade.
          </p>
          <p className="text-lg text-neutral-600">
            Nossa visão é ser a ponte entre você e a essência que te representa, tornando a jornada da descoberta um processo fácil, intuitivo e prazeroso.
          </p>
        </div>
        <div className="order-1 md:order-2 relative w-full h-80 rounded-lg overflow-hidden shadow-lg animate-fade-in">
          <Image
            src="https://images.pexels.com/photos/10398696/pexels-photo-10398696.jpeg"
            alt="Frascos de perfume em uma prateleira de madeira"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Seção de Valores */}
      <section className="container mx-auto mb-16 animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-700 text-center mb-8">
          Nossos Valores
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-secondary-700 mb-2">Qualidade</h3>
            <p className="text-neutral-600">Garantimos a procedência e a excelência de cada fragrância em nosso catálogo.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-secondary-700 mb-2">Originalidade</h3>
            <p className="text-neutral-600">Buscamos marcas exclusivas e aromas que fogem do comum, celebrando a individualidade.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold text-secondary-700 mb-2">Consciência</h3>
            <p className="text-neutral-600">Trabalhamos com fornecedores que compartilham nosso compromisso com a sustentabilidade e práticas éticas.</p>
          </div>
        </div>
      </section>

      {/* Seção de CTA (Chamada para Ação) */}
      <section className="container mx-auto text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-700 mb-4">
          Pronto para encontrar a sua essência?
        </h2>
        <p className="text-lg text-neutral-600 mb-8">
          Descubra o perfume que te define em nossa coleção.
        </p>
        <Link 
          href="/produtos"
          className="bg-primary-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-primary-600 transition-colors duration-300 shadow-lg"
        >
          Explorar Produtos
        </Link>
      </section>
    </main>
  );
}