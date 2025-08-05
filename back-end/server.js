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
    // ALTERAÇÃO AQUI: Trocando o modelo de 'gemini-pro' para 'gemini-pro-vision'
    const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' });
    
    // A API gemini-pro-vision espera um array de conteúdos.
    // Vamos adaptar a chamada.
    const result = await model.generateContent([prompt]);
    const response = await result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Erro detalhado da API do Gemini:', error.message);
    res.status(500).json({ error: 'Erro ao se comunicar com a IA. Tente novamente mais tarde.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});