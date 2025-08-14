import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Instancia o cliente do Supabase para uso no servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

// Define a tipagem para os parâmetros da URL
interface Context {
  params: {
    id: string;
  };
}

export async function GET(req: Request, context: Context) {
  const { id } = context.params;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Código de erro para "not found"
        return NextResponse.json({ error: 'Produto não encontrado.' }, { status: 404 });
      }
      console.error('Erro ao buscar produto por ID:', error);
      return NextResponse.json(
        { error: 'Erro ao buscar o produto no banco de dados.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ product: data });
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor.' },
      { status: 500 }
    );
  }
}