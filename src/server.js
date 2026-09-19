const express = require('express');
const path = require('path');
const db = require('./config/firebase');

const app = express();
app.use(express.json());

// Diz ao Express onde vão ficar os arquivos do jogo (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Rota de teste para ver se está tudo funcionando
app.get('/api/status', (req, res) => {
    res.json({ message: "Servidor rodando e conectado ao Firebase!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});