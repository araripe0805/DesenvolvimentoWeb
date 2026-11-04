// backend/routes/userRoutes.js
import express from 'express';
import reservaController from '../controllers/reservaController.js';

const router = express.Router();

router.post('/', reservaController.criarReserva);

router.get('/', reservaController.listarReservas);

router.get('/usuario/:usuarioId',reservaController.listarReservasUsuario);

router.patch('/:id/cancelar',reservaController.cancelarReserva);

router.get('/quadra/:quadraId/ocupados', reservaController.horariosOcupados);

export default router;