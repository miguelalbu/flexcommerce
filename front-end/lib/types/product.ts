// lib/types/product.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url?: string | null; // Torna 'image_url' opcional
  brand: string;
  category: string;
  fragrance_notes?: string;
}