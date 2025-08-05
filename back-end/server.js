// backend/server.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
}));
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Endpoint de API para o chat com Gemini
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'A pergunta não foi fornecida.' });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // --- ENGENHARIA DE PROMPT APLICADA AQUI ---
    const systemInstruction = `
      Você é um assistente virtual especializado em perfumes e fragrâncias para a loja de e-commerce chamada FlexCommerce. 
      Sua persona é a de um consultor amigável, experiente e educado.

      Sua tarefa é ajudar os clientes a encontrar o perfume perfeito, responder a dúvidas sobre os produtos, ingredientes, 
      ocasiões de uso e dar recomendações personalizadas com base no que o cliente descreve.

      Aqui estão as regras:
      - Mantenha a resposta focada no universo de perfumes.
      - Não mencione marcas ou produtos de concorrentes.
      - Mantenha a conversa amigável e profissional.
      - Sempre que possível, termine a resposta com uma pergunta para incentivar o cliente a continuar a conversa.
      - A resposta deve ser em português do Brasil e ter no máximo 3 frases.

      Cliente: ${prompt}

      Sua resposta (como assistente da FlexCommerce):
    `;

    const result = await model.generateContent([systemInstruction]);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Erro detalhado da API do Gemini:', error.message);
    res.status(500).json({ error: 'Erro ao se comunicar com a IA. Tente novamente mais tarde.' });
  }
});
// ... (outras rotas) ...

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});