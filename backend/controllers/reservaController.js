import mongoose from 'mongoose';
import Reserva from '../models/reservaModel.js';
import Horario from '../models/horarioModel.js';
import Quadra from '../models/quadraModel.js';

const reservaController = {
    // Criar uma reserva
    criarReserva: async (req, res) => {
        try {
            const { usuario, quadra, horario, data } = req.body;

            if (!usuario || !quadra || !horario || !data) {
                return res.status(400).json({
                    erro: 'Informe usuário, quadra, horário e data.'
                });
            }

            // Verifica se os IDs são válidos
            if (
                !mongoose.Types.ObjectId.isValid(usuario) ||
                !mongoose.Types.ObjectId.isValid(quadra) ||
                !mongoose.Types.ObjectId.isValid(horario)
            ) {
                return res.status(400).json({
                    erro: 'Um dos IDs informados é inválido.'
                });
            }

            const dataReserva = new Date(data);

            if (Number.isNaN(dataReserva.getTime())) {
                return res.status(400).json({
                    erro: 'Data inválida.'
                });
            }

            //Verificar se quadra ja existe
            const quadraExiste = await Quadra.findOne({
                _id: quadra,
                ativo: true
            });

            if (!quadraExiste) {
                return res.status(404).json({
                    erro: 'Quadra não encontrada ou inativa.'
                });
            }

            //horario quadra
            const horarioExiste = await Horario.findOne({
                _id: horario,
                quadra,
                ativo: true
            });

            if (!horarioExiste) {
                return res.status(404).json({
                    erro: 'Horário não encontrado ou indisponível.'
                });
            }

            // Verifica se o horário já foi reservado
            const reservaExistente = await Reserva.findOne({
                quadra,
                horario,
                data: dataReserva,
                status: 'confirmada'
            });

            if (reservaExistente) {
                return res.status(409).json({
                    erro: 'Esse horário já foi reservado.'
                });
            }

            const novaReserva = await Reserva.create({
                usuario,
                quadra,
                horario,
                data: dataReserva,
                status: 'confirmada'
            });

            return res.status(201).json(novaReserva);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao criar reserva.'
            });
        }
    },

    // Listar todas as reservas
    listarReservas: async (req, res) => {
        try {
            const reservas = await Reserva.find()
                .populate('usuario', 'nome matricula')
                .populate('quadra', 'nome tipo localizacao')
                .populate('horario', 'diaSemana horaInicio horaFim');

            return res.status(200).json(reservas);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao listar reservas.'
            });
        }
    },
    
    listarReservasUsuario: async (req, res) => {
        try {
            const { usuarioId } = req.params;

            const reservas = await Reserva.find({
                usuario: usuarioId
            })
                .populate('quadra', 'nome tipo localizacao')
                .populate('horario', 'diaSemana horaInicio horaFim');

            return res.status(200).json(reservas);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao listar reservas do usuário.'
            });
        }
    },

    // Cancelar reserva
    cancelarReserva: async (req, res) => {
        try {
            const { id } = req.params;
            const { canceladaPor } = req.body;

            if (
                canceladaPor &&
                !mongoose.Types.ObjectId.isValid(canceladaPor)
            ) {
                return res.status(400).json({
                    erro: 'ID de quem cancelou é inválido.'
                });
            }

            const reserva = await Reserva.findById(id);

            if (!reserva) {
                return res.status(404).json({
                    erro: 'Reserva não encontrada.'
                });
            }

            if (reserva.status === 'cancelada') {
                return res.status(400).json({
                    erro: 'Essa reserva já foi cancelada.'
                });
            }

            reserva.status = 'cancelada';
            reserva.canceladaPor = canceladaPor || null;
            reserva.dataCancelamento = new Date();

            await reserva.save();

            return res.status(200).json({
                mensagem: 'Reserva cancelada com sucesso.',
                reserva
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao cancelar reserva.'
            });
        }
    }
};

export default reservaController;