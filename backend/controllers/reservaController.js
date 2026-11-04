import mongoose from 'mongoose';
import Reserva from '../models/reservaModel.js';
import Horario from '../models/horarioModel.js';
import Quadra from '../models/quadraModel.js';
import User from '../models/userModel.js';

const DIAS_SEMANA = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];


const reservaController = {
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

            // A data precisa vir como texto AAAA-MM-DD
            if (typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
                return res.status(400).json({
                    erro: 'Informe a data no formato AAAA-MM-DD.'
                });
            }

            const dataReserva = new Date(data);

            // Rejeita datas que não existem (ex.: 2026-02-31)
            if (
                Number.isNaN(dataReserva.getTime()) ||
                dataReserva.toISOString().slice(0, 10) !== data
            ) {
                return res.status(400).json({
                    erro: 'Data inválida.'
                });
            }

            // Rejeita datas que já passaram
            const agora = new Date();
            const hoje = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')}`;

            if (data < hoje) {
                return res.status(400).json({
                    erro: 'Não é possível reservar uma data que já passou.'
                });
            }

            const usuarioExiste = await User.findById(usuario);

            if (!usuarioExiste) {
                return res.status(404).json({
                    erro: 'Usuário não encontrado.'
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

            // O dia da semana da data tem que ser o do horário
            const diaDaData = DIAS_SEMANA[dataReserva.getUTCDay()];

            if (diaDaData !== horarioExiste.diaSemana) {
                return res.status(400).json({
                    erro: `Esse horário é de ${horarioExiste.diaSemana}, mas a data escolhida é ${diaDaData}.`
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

    // Horários já reservados de uma quadra em uma data
    horariosOcupados: async (req, res) => {
        try {
            const { quadraId } = req.params;
            const { data } = req.query;

            if (!mongoose.Types.ObjectId.isValid(quadraId)) {
                return res.status(400).json({ erro: 'ID da quadra inválido.' });
            }

            if (typeof data !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
                return res.status(400).json({ erro: 'Informe a data no formato AAAA-MM-DD.' });
            }

            const dataReserva = new Date(data);

            if (Number.isNaN(dataReserva.getTime())) {
                return res.status(400).json({ erro: 'Data inválida.' });
            }

            const reservas = await Reserva.find({
                quadra: quadraId,
                data: dataReserva,
                status: 'confirmada'
            }).select('horario');

            return res.status(200).json(reservas.map((r) => r.horario));
        } catch (error) {
            console.error(error);
            return res.status(500).json({ erro: 'Erro ao buscar horários ocupados.' });
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