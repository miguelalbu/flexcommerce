import { Product } from '@/lib/context/CartContext';

export const products: Product[] = [
  {
    id: '1',
    name: 'Perfume Elegance Noir',
    price: 149.90,
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg',
    description: 'Um perfume sofisticado com notas amadeiradas e florais. Perfeito para ocasiões especiais, oferece uma fragrância duradoura e envolvente que combina elegância e modernidade.',
    category: 'Perfumes Masculinos'
  },
  {
    id: '2',
    name: 'Essência Floral Dreams',
    price: 119.90,
    image: 'https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg',
    description: 'Uma fragrância delicada e feminina com notas de flores silvestres e frutas cítricas. Ideal para o dia a dia, proporciona frescor e leveza em qualquer momento.',
    category: 'Perfumes Femininos'
  },
  {
    id: '3',
    name: 'Aroma Citrus Fresh',
    price: 89.90,
    image: 'https://images.pexels.com/photos/1190829/pexels-photo-1190829.jpeg',
    description: 'Um perfume refrescante com predominância de notas cítricas. Perfeito para quem busca energia e vitalidade, ideal para atividades esportivas e momentos casuais.',
    category: 'Perfumes Unissex'
  },
  {
    id: '4',
    name: 'Mystique Oriental',
    price: 199.90,
    image: 'https://images.pexels.com/photos/1420704/pexels-photo-1420704.jpeg',
    description: 'Uma fragrância exótica e intensa com notas orientais e especiarias. Para personalidades marcantes que desejam se destacar com um aroma único e memorável.',
    category: 'Perfumes Premium'
  },
  {
    id: '5',
    name: 'Ocean Breeze',
    price: 79.90,
    image: 'https://images.pexels.com/photos/1375264/pexels-photo-1375264.jpeg',
    description: 'Inspirado na brisa do mar, este perfume traz frescor e tranquilidade. Com notas aquáticas e marinhas, é perfeito para quem ama a natureza e busca leveza.',
    category: 'Perfumes Aquáticos'
  },
  {
    id: '6',
    name: 'Vanilla Sensation',
    price: 134.90,
    image: 'https://images.pexels.com/photos/1666065/pexels-photo-1666065.jpeg',
    description: 'Um perfume doce e envolvente com base de baunilha e toques gourmand. Ideal para momentos íntimos e especiais, oferece aconchego e sensualidade.',
    category: 'Perfumes Doces'
  },
  {
    id: '7',
    name: 'Wild Adventure',
    price: 164.90,
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    description: 'Para os aventureiros de plantão, este perfume combina notas selvagens e amadeiradas. Desperta o espírito livre e a conexão com a natureza.',
    category: 'Perfumes Aventura'
  },
  {
    id: '8',
    name: 'Rose Garden',
    price: 124.90,
    image: 'https://images.pexels.com/photos/1055379/pexels-photo-1055379.jpeg',
    description: 'Um clássico atemporal com essência pura de rosas. Elegante e romântico, é perfeito para mulheres que apreciam a beleza tradicional das flores.',
    category: 'Perfumes Florais'
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getCategories = (): string[] => {
  return Array.from(new Set(products.map(product => product.category)));
};