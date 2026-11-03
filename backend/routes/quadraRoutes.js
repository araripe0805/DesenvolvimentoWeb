import express from 'express';
import quadraController from '../controllers/quadraController.js';

const router = express.Router();

router.post('/', quadraController.criarQuadra);
router.get('/', quadraController.listarQuadras);
<<<<<<< HEAD
=======

>>>>>>> 22cec8d (COrrigindo a porra do merge)
export default router;