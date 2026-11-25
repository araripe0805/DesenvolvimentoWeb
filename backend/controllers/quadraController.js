import Quadra from '../models/quadraModel.js';
import User from '../models/userModel.js';
import mongoose from 'mongoose';
import Horario from '../models/horarioModel.js';
import { gerarHorariosPadrao } from '../utils/horariosPadrao.js';
import { gerarIdQuadra } from '../utils/gerarIdQuadra.js';

const CAMPOS_EDITAVEIS = [
  'nome', 'tipo', 'localizacao', 'capacidade',
  'preco', 'largura', 'comprimento', 'descricao',
];

const quadraController = {
  criarQuadra: async (req, res) => {
    try {
        const { 
        nome, 
        tipo, 
        localizacao, 
        capacidade, 
        preco, 
        largura, 
        comprimento, 
        descricao, 
        imagem, 
        ativo, 
        administrador } = req.body;

      if (
        !nome ||
        !tipo ||
        !localizacao ||
        capacidade == null ||
        preco == null ||
        largura == null ||
        comprimento == null
      ) {
        return res.status(400).json({ erro: 'Preencha todos os campos.' });
      }

      const quadraExistente = await Quadra.findOne({ nome, localizacao });
      if (quadraExistente) {
        return res.status(409).json({ erro: 'Essa quadra já está cadastrada.' });
      }

      const idQuadra = await gerarIdQuadra();

      const novaQuadra = await Quadra.create({
        idQuadra,
        nome,
        tipo,
        localizacao,
        capacidade,
        preco,
        largura,
        comprimento,
        descricao,
        imagem,
        ativo,
        administrador
      });

      await Horario.insertMany(gerarHorariosPadrao(novaQuadra._id));

      return res.status(201).json({
        _id: novaQuadra._id,
        nome: novaQuadra.nome,
        tipo: novaQuadra.tipo,
        localizacao: novaQuadra.localizacao,
        capacidade: novaQuadra.capacidade,
        preco: novaQuadra.preco,
        largura: novaQuadra.largura,
        comprimento: novaQuadra.comprimento,
        descricao: novaQuadra.descricao,
        imagem: novaQuadra.imagem,
        ativo: novaQuadra.ativo,
        administrador: novaQuadra.administrador
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao criar quadra.' });
    }
  },

  listarQuadras: async (req, res) => {
    try {
      const quadras = await Quadra.find({ ativo: true });

    return res.status(200).json(quadras);
    } catch (error) {
      console.error(error);

    return res.status(500).json({
        erro: 'Erro ao buscar quadras.'
      });
    }
  },

  buscarQuadra: async (req, res) => {
    try {
      const { id } = req.params;

      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ erro: 'Id inválido.' });
      }

      const quadra = await Quadra.findOne({ _id: id, ativo: true });

      if (!quadra) {
        return res.status(404).json({ erro: 'Quadra não encontrada.' });
      }

      return res.status(200).json(quadra);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar quadra.' });
    }
  },

  atualizarQuadra: async (req, res) => {
    try {
      const { id } = req.params;
      const { usuario } = req.body;

      // 1. Formato dos ids
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ erro: 'Id da quadra inválido.' });
      }

      if (typeof usuario !== 'string' || !mongoose.isValidObjectId(usuario)) {
        return res.status(400).json({ erro: 'Usuário inválido.' });
      }

      // 2. Quem está pedindo é admin?
      const admin = await User.findById(usuario);
      if (!admin || admin.tipoUser !== 'admin') {
        return res.status(403).json({ erro: 'Apenas administradores podem editar quadras.' });
      }

      // 3. Só os campos permitidos que vieram no pedido
      const alteracoes = {};
      for (const campo of CAMPOS_EDITAVEIS) {
        if (req.body[campo] !== undefined) {
          alteracoes[campo] = req.body[campo];
        }
      }

      if (Object.keys(alteracoes).length === 0) {
        return res.status(400).json({ erro: 'Nenhuma alteração informada.' });
      }

      // 4. Busca a quadra
      const quadra = await Quadra.findOne({ _id: id, ativo: true });
      if (!quadra) {
        return res.status(404).json({ erro: 'Quadra não encontrada.' });
      }

      // 5. Evita duplicar nome + localização
      if (alteracoes.nome !== undefined || alteracoes.localizacao !== undefined) {
        const novoNome = alteracoes.nome ?? quadra.nome;
        const novaLocalizacao = alteracoes.localizacao ?? quadra.localizacao;

        if (typeof novoNome !== 'string' || typeof novaLocalizacao !== 'string') {
          return res.status(400).json({ erro: 'Nome e localização devem ser texto.' });
        }

        const duplicada = await Quadra.findOne({
          _id: { $ne: id },
          nome: novoNome.trim(),
          localizacao: novaLocalizacao,
        });

        if (duplicada) {
          return res.status(409).json({ erro: 'Já existe uma quadra com esse nome e localização.' });
        }
      }

      // 6. Aplica e salva (o model valida enum, mínimos e obrigatórios)
      quadra.set(alteracoes);
      await quadra.save();

      return res.status(200).json(quadra);
    } catch (error) {
      if (error.name === 'ValidationError') {
        const mensagens = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ erro: mensagens.join(' ') });
      }

      console.error(error);
      return res.status(500).json({ erro: 'Erro ao atualizar quadra.' });
    }
  },

  deletarQuadra: async (req, res) => {
    try {
      const { id } = req.params;

      const quadra = await Quadra.findByIdAndDelete(id);

      if (!quadra) {
        return res.status(404).json({
          erro: 'Quadra não encontrada.'
        });
      }

      return res.status(200).json({
        mensagem: 'Quadra deletada com sucesso.'
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        erro: 'Erro ao deletar quadra.'
      });
    }
  }
};

export default quadraController;