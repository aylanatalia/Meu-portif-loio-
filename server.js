const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve arquivos estáticos na pasta 'public'

app.post('/contatos', (req, res) => {
    try {
        const { nome, email, assunto, mensagem } = req.body;
        const novoContato = { 
            id: Date.now(), // Gere um ID único, você pode usar outra lógica para gerar IDs
            nome, 
            email, 
            assunto, 
            mensagem 
        };
        const db = JSON.parse(fs.readFileSync('db.json', 'utf8'));
        db.contatos.push(novoContato);
        fs.writeFileSync('db.json', JSON.stringify(db, null, 2)); // O null e o 2 são para formatação bonita
        res.status(201).send('Dados recebidos com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar os dados:', error);
        res.status(500).send('Erro interno ao salvar os dados.');
    }
});
