import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Instancia o cliente do Supabase para uso no servidor
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const redirectTo = searchParams.get('redirectTo') || 'http://localhost:3000/perfil';

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    // Retorna a URL de redirecionamento do Supabase
    return NextResponse.json({ url: data.url });
  } catch (err: any) {
    return NextResponse.json({ message: 'Erro ao iniciar login com Google.' }, { status: 500 });
  }
}