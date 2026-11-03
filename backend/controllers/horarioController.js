import mongoose from 'mongoose';
import Horario from '../models/horarioModel.js';
import Quadra from '../models/quadraModel.js';

const horarioController = {
    // Cadastrar horário
    criarHorario: async (req, res) => {
        try {
            const {
                quadra,
                diaSemana,
                horaInicio,
                horaFim
            } = req.body;

            if (!quadra || !diaSemana || !horaInicio || !horaFim) {
                return res.status(400).json({
                    erro: 'Preencha todos os campos.'
                });
            }

            if (!mongoose.Types.ObjectId.isValid(quadra)) {
                return res.status(400).json({
                    erro: 'ID da quadra inválido.'
                });
            }

            const quadraExiste = await Quadra.findById(quadra);

            if (!quadraExiste) {
                return res.status(404).json({
                    erro: 'Quadra não encontrada.'
                });
            }

            // Converte HH:mm em minutos para comparar os horários
            const converterParaMinutos = (hora) => {
                const [horas, minutos] = hora.split(':').map(Number);
                return horas * 60 + minutos;
            };

            const inicio = converterParaMinutos(horaInicio);
            const fim = converterParaMinutos(horaFim);

            if (fim <= inicio) {
                return res.status(400).json({
                    erro: 'O horário final deve ser posterior ao inicial.'
                });
            }

            // Busca horários ativos que se sobrepõem
            const horariosExistentes = await Horario.find({
                quadra,
                diaSemana,
                ativo: true
            });

            const existeSobreposicao = horariosExistentes.some((horario) => {
                const inicioExistente = converterParaMinutos(horario.horaInicio);
                const fimExistente = converterParaMinutos(horario.horaFim);

                return inicio < fimExistente && fim > inicioExistente;
            });

            if (existeSobreposicao) {
                return res.status(409).json({
                    erro: 'Já existe um horário que se sobrepõe a esse intervalo.'
                });
            }

            const novoHorario = await Horario.create({
                quadra,
                diaSemana,
                horaInicio,
                horaFim
            });

            return res.status(201).json(novoHorario);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao cadastrar horário.'
            });
        }
    },

    // Listar todos os horários
    listarHorarios: async (req, res) => {
        try {
            const horarios = await Horario.find({ ativo: true })
                .populate('quadra', 'nome tipo localizacao');

            return res.status(200).json(horarios);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao listar horários.'
            });
        }
    },

    // Listar horários de uma quadra
    listarHorariosQuadra: async (req, res) => {
        try {
            const { quadraId } = req.params;

            if (!mongoose.Types.ObjectId.isValid(quadraId)) {
                return res.status(400).json({
                    erro: 'ID da quadra inválido.'
                });
            }

            const horarios = await Horario.find({
                quadra: quadraId,
                ativo: true
            }).sort({
                diaSemana: 1,
                horaInicio: 1
            });

            return res.status(200).json(horarios);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao buscar horários da quadra.'
            });
        }
    },

    // Desativar horário
    desativarHorario: async (req, res) => {
        try {
            const { id } = req.params;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({
                    erro: 'ID do horário inválido.'
                });
            }

            const horario = await Horario.findByIdAndUpdate(
                id,
                { ativo: false },
                { new: true }
            );

            if (!horario) {
                return res.status(404).json({
                    erro: 'Horário não encontrado.'
                });
            }

            return res.status(200).json({
                mensagem: 'Horário desativado.',
                horario
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                erro: 'Erro ao desativar horário.'
            });
        }
    }
};

export default horarioController;