// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToMongoDB } from './config/db.js';

// Importar as rotas
import quadraRoutes from './routes/quadraRoutes.js';
import userRoutes from './routes/userRoutes.js';
import reservaRoutes from './routes/reservaRoutes.js';
import horarioRoutes from './routes/horarioRoutes.js';
import mensagemRoutes from './routes/mensagemRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToMongoDB();

    // Middlewares
    app.use(cors());
    app.use(express.json());

    // Registo das Rotas
    app.use('/api/quadras', quadraRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/reservas', reservaRoutes);
    app.use('/api/horarios', horarioRoutes);
    app.use('/api/mensagens', mensagemRoutes);

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (err) {
    console.error('Não foi possível iniciar o servidor:', err);
    process.exitCode = 1;
  }
}

startServer();