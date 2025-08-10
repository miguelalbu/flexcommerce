import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

export async function POST(request) {
  const { email, password, name, phone } = await request.json();

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

  return NextResponse.json({ message: 'Cadastro realizado com sucesso!', user: data.user });
}