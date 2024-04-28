const express = require('express');
const server = express();
const port = process.env.PORT || 3000;

server.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});

server.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});