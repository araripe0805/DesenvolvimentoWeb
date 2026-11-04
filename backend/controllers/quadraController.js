import Quadra from '../models/quadraModel.js';

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

      const novaQuadra = await Quadra.create({
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