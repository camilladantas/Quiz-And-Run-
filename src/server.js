const express = require('express');
const path = require('path');
const db = require('./config/firebase');

const app = express();
app.use(express.json());


app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/status', (req, res) => {
    res.json({ message: "Servidor rodando e conectado ao Firebase!" });
});

const PORT = process.env.PORT || 3000;
app.get('/api/perguntas', async (req, res) => {
    try {
        const snapshot = await db.collection('perguntas').get();
        const perguntas = [];
        
        snapshot.forEach(doc => {
            perguntas.push({
                id: doc.id, 
                ...doc.data() 
            });
        });

        res.json(perguntas);
    } catch (error) {
        console.error("Erro ao buscar perguntas no Firebase:", error);
        res.status(500).json({ erro: "Falha ao carregar o quiz" });
    }
});
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});