import User from '../models/userModel.js';
import bcrypt from 'bcrypt';

const userController = {
  criarUsuario: async (req, res) => {
    try {
      // 1. Dados que vieram do front
      const { nome, matricula, telefone, senha } = req.body;

      // 2. Validação básica
      if (!nome || !matricula || !telefone || !senha) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
      }

      // 3. Matrícula já cadastrada?
      const usuarioExistente = await User.findOne({ matricula });
      if (usuarioExistente) {
        return res.status(409).json({ erro: 'Essa matrícula já está cadastrada.' });
      }

      // 4. Criptografa a senha (10 = custo do hash)
      const senhaCriptografada = await bcrypt.hash(senha, 10);

      // 5. Salva no MongoDB
      const novoUsuario = await User.create({
        nome,
        matricula,
        telefone,
        senha: senhaCriptografada,
      });

      // 6. Responde sem devolver a senha
      return res.status(201).json({
        _id: novoUsuario._id,
        nome: novoUsuario.nome,
        matricula: novoUsuario.matricula,
        telefone: novoUsuario.telefone,
        tipoUser: novoUsuario.tipoUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
  },
};

export default userController;