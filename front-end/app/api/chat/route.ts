import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Instancia o cliente da API do Gemini usando a chave de ambiente
// Next.js carrega as variáveis de ambiente automaticamente, então não precisa de `dotenv`
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'A pergunta não foi fornecida.' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // --- ENGENHARIA DE PROMPT APLICADA AQUI ---
    const systemInstruction = `
      Você é um especialista em perfumes da FlexCommerce.
      Regras essenciais:
      - Recomende o perfume ideal imediatamente na primeira frase
      - Dê uma única explicação curta sobre a escolha
      - Faça apenas UMA pergunta simples sobre preferência (doce/cítrico/floral)
      - Use português do Brasil
      - Foque apenas nos produtos da FlexCommerce

      Cliente: ${prompt}

      Resposta (máximo 2 frases):
    `;

    const result = await model.generateContent([systemInstruction]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Erro detalhado da API do Gemini:', error.message);
    return NextResponse.json(
      { error: 'Erro ao se comunicar com a IA. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
