import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

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
  
  login: async (req, res) => {
    try {
      // 1. Dados que vieram do front
      const {matricula, senha} = req.body;
      
      // 2. Validação básica
      if (!matricula || !senha) {
        return res.status(400).json({ erro: 'Informe matrícula e senha.' });
      }

      if (typeof matricula !== 'string' || typeof senha !== 'string') {
        return res.status(400).json({ erro: 'Dados inválidos.' });
      }

      // 3. Procura o usuário pela matrícula
      const usuario = await User.findOne({matricula})

      // 4. Compara a senha digitada com o hash salvo
      const senhaCorreta = usuario
        ? await bcrypt.compare(senha, usuario.senha)
        : false;

      if (!usuario || !senhaCorreta) {
        return res.status(401).json({ erro: 'Matrícula ou senha incorretos.' });
      }

      // 5. Sucesso: devolve os dados sem a senha
      return res.status(200).json({
        _id: usuario._id,
        nome: usuario.nome,
        matricula: usuario.matricula,
        telefone: usuario.telefone,
        tipoUser: usuario.tipoUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao fazer login.' });
    }
  },

  atualizarUsuario: async (req, res) => {
    try {
      // 1. Dados que vieram do front
      const { id } = req.params;
      const { telefone, novaSenha, senhaAtual } = req.body;

      // 2. Validações básicas
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ erro: 'Id inválido.' });
      }

      if (!senhaAtual || typeof senhaAtual !== 'string') {
        return res.status(400).json({ erro: 'Informe sua senha atual para confirmar.' });
      }

      if (telefone === undefined && novaSenha === undefined) {
        return res.status(400).json({ erro: 'Nenhuma alteração informada.' });
      }

      if (telefone !== undefined && (typeof telefone !== 'string' || !telefone.trim())) {
        return res.status(400).json({ erro: 'Telefone inválido.' });
      }

      if (novaSenha !== undefined && (typeof novaSenha !== 'string' || !novaSenha)) {
        return res.status(400).json({ erro: 'Nova senha inválida.' });
      }

      // 3. Procura o usuário
      const usuario = await User.findById(id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      // 4. Confere a senha atual
      const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
      if (!senhaCorreta) {
        return res.status(401).json({ erro: 'Senha atual incorreta.' });
      }

      // 5. Aplica só o que foi enviado
      if (telefone !== undefined) {
        usuario.telefone = telefone.trim();
      }

      if (novaSenha !== undefined) {
        usuario.senha = await bcrypt.hash(novaSenha, 10);
      }

      // 6. Salva e responde sem a senha
      await usuario.save();

      return res.status(200).json({
        _id: usuario._id,
        nome: usuario.nome,
        matricula: usuario.matricula,
        telefone: usuario.telefone,
        tipoUser: usuario.tipoUser,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
    }
  }
};

export default userController;