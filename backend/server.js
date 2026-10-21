// backend/server.js
const express = require('express');
const cors = require('cors');

// Importar os grupos de rotas
const quadraRoutes = require('./routes/quadraRoutes');
const userRoutes = require('./routes/userRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const horarioRoutes = require('./routes/horarioRoutes');
const mensagemRoutes = require('./routes/mensagemRoutes');

const app = express();
const PORT = 5000;

// Middlewares (Configurações iniciais)
app.use(cors()); // Permite que o React (porta diferente) converse com este servidor
app.use(express.json()); // Permite que o servidor entenda dados enviados em JSON

// Registo das Rotas (Os corredores do nosso "restaurante")
app.use('/api/quadras', quadraRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/horarios', horarioRoutes);
app.use('/api/mensagens', mensagemRoutes);

// Ligar o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor backend a rodar na porta ${PORT}`);
});