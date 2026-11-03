import express from 'express';
import quadraController from '../controllers/quadraController.js';

const router = express.Router();

router.post('/', quadraController.criarQuadra);
router.get('/', quadraController.listarQuadras);
router.delete('/:id', quadraController.deletarQuadra);
export default router;