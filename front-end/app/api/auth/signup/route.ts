import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Instancia o cliente do Supabase para uso no servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(req: Request) {
  try {
    const { email, password, name, phone } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email e senha são obrigatórios.' }, { status: 400 });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone }
      }
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Não retorna a senha ou dados sensíveis do usuário
    return NextResponse.json({ message: 'Cadastro realizado com sucesso!', user: data.user }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ message: 'Erro interno no servidor.' }, { status: 500 });
  }
}
