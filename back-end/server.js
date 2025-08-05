const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000', // Porta do frontend
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
    // Usando o modelo correto para entrada apenas de texto
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent([prompt]);
    const response = result.response;
    const text = response.text();

    res.json({ response: text });
  } catch (error) {
    console.error('Erro detalhado da API do Gemini:', error); // Mostra o erro completo
    res.status(500).json({ error: 'Erro ao se comunicar com a IA. Tente novamente mais tarde.' });
  }
});

app.listen(port, () => {
  console.log(`✅ Servidor rodando em http://localhost:${port}`);
});