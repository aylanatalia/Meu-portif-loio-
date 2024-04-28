const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Define a porta do servidor

// Middleware para lidar com solicitações JSON
app.use(express.json());

// Rota para lidar com o envio do formulário
app.post('/api/formulario', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    // Aqui você pode processar os dados do formulário como desejar
    console.log('Dados do formulário recebidos:', { nome, email, assunto, mensagem });
    res.json({ mensagem: 'Dados recebidos com sucesso!' });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
