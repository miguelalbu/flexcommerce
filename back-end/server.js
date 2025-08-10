const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const supabase = require('./supabase');



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

app.get('/api/products', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*');

    if (error) {
      console.error('Erro ao buscar produtos do Supabase:', error);
      return res.status(500).json({ error: 'Erro ao buscar produtos no banco de dados.' });
    }



    res.json({ products: data });
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});


app.get('/api/products/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') { // Código de erro para "not found"
        return res.status(404).json({ error: 'Produto não encontrado.' });
      }
      console.error('Erro ao buscar produto por ID:', error);
      return res.status(500).json({ error: 'Erro ao buscar o produto no banco de dados.' });
    }

    res.json({ product: data });
  } catch (error) {
    console.error('Erro interno no servidor:', error);
    res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

// ROTA DE CADASTRO
app.post('/auth/signup', async (req, res) => {
  const { email, password, name, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, phone }
      }
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json({ message: 'Cadastro realizado com sucesso!', user: data.user });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// ROTA DE LOGIN
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(200).json({ message: 'Login realizado com sucesso!', user: data.user, session: data.session });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

// ROTA DE LOGIN/CADASTRO COM GOOGLE
app.get('/auth/google', async (req, res) => {
  try {
    const redirectTo = req.query.redirectTo || 'http://localhost:3000/perfil'; // para onde o usuário será redirecionado após login
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    // Redireciona o usuário para a URL de autenticação do Google
    return res.redirect(data.url);
  } catch (err) {
    return res.status(500).json({ message: 'Erro ao iniciar login com Google.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});