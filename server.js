const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Conecta ao banco de dados MongoDB
mongoose.connect('mongodb://localhost:27017/meu_banco_de_dados', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Cria um modelo (schema) para os dados do formulário
const Formulario = mongoose.model('Formulario', {
    nome: String,
    email: String,
    assunto: String,
    mensagem: String
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/formulario', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;

    // Cria uma instância do modelo Formulario com os dados recebidos
    const formulario = new Formulario({ nome, email, assunto, mensagem });

    // Salva os dados no banco de dados
    formulario.save()
        .then(() => {
            console.log('Dados do formulário salvos no banco de dados:');
            console.log('Nome:', nome);
            console.log('Email:', email);
            console.log('Assunto:', assunto);
            console.log('Mensagem:', mensagem);
            res.json({ message: 'Dados salvos com sucesso!' });
        })
        .catch(error => {
            console.error('Erro ao salvar os dados:', error);
            res.status(500).json({ error: 'Erro ao salvar os dados' });
        });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
