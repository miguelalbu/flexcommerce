import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Instancia o cliente do Supabase para uso no servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Erro ao buscar produtos do Supabase:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar produtos no banco de dados.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ products: data });
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}