// ==============================================================================
// BACKEND PRINCIPAL (NODE.JS + EXPRESS)
// ==============================================================================
// Este servidor atua como o maestro do sistema.
// Ele recebe as requisições do Frontend (React/Next.js), processa o que for 
// necessário (como salvar no banco de dados) e se comunica com o Microserviço 
// Python para tarefas de IA e processamento de imagem.
// ==============================================================================

const express = require('express');
const cors = require('cors');
const axios = require('axios'); // Axios serve para fazer requisições HTTP para o microserviço Python

const app = express();
const PORT = process.env.PORT || 4000;
const PYTHON_MICROSERVICE_URL = 'http://localhost:5000'; // URL onde o Python estará rodando

// Middlewares
// CORS permite que o frontend (na porta 3000) converse com o backend (na porta 4000)
app.use(cors());
// Permite que o Express entenda requisições com corpo no formato JSON
app.use(express.json());

// ------------------------------------------------------------------------------
// ROTA DE TESTE
// ------------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', mensagem: 'Backend Node.js rodando perfeitamente!' });
});

// ------------------------------------------------------------------------------
// ROTA: Buscar dados do veículo (Redireciona para o Python)
// ------------------------------------------------------------------------------
app.get('/api/vehicles', async (req, res) => {
    try {
        const { marca, modelo } = req.query;
        
        // Faz uma requisição (GET) para o microserviço Python
        const respostaPython = await axios.get(`${PYTHON_MICROSERVICE_URL}/api/vehicle`, {
            params: { marca, modelo }
        });
        
        // Repassa a resposta do Python para o Frontend
        res.json(respostaPython.data);
    } catch (erro) {
        console.error("Erro ao contatar o microserviço Python:", erro.message);
        res.status(500).json({ erro: "Falha na comunicação com o serviço de Inteligência Artificial." });
    }
});

// ------------------------------------------------------------------------------
// ROTA: Solicitar geração de arte (Redireciona para o Python)
// ------------------------------------------------------------------------------
app.post('/api/art/generate', async (req, res) => {
    try {
        const { prompt, estilo } = req.body;
        
        // Envia o prompt para o serviço Python que gerencia a IA (Stable Diffusion/DALL-E)
        const respostaPython = await axios.post(`${PYTHON_MICROSERVICE_URL}/api/generate-art`, {
            prompt,
            estilo
        });
        
        // Retorna a imagem gerada para o Frontend
        res.json(respostaPython.data);
    } catch (erro) {
        console.error("Erro ao gerar arte:", erro.message);
        res.status(500).json({ erro: "Erro ao tentar gerar arte com IA." });
    }
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`🚀 Backend Node.js rodando na porta ${PORT}`);
    console.log(`🔗 Aguardando comunicação do Frontend na porta 3000`);
    console.log(`🧠 Conectado ao Microserviço Python na porta 5000`);
});
