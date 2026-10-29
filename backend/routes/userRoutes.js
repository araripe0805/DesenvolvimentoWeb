// backend/routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.post('/', userController.criarUsuario);
router.post('/login', userController.login);

export default router;