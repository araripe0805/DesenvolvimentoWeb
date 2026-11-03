import express from 'express';
import horarioController from '../controllers/horarioController.js';

const router = express.Router();

router.post('/', horarioController.criarHorario);

router.get('/', horarioController.listarHorarios);

router.get('/quadra/:quadraId', horarioController.listarHorariosQuadra);

router.patch('/:id/desativar', horarioController.desativarHorario);

export default router;