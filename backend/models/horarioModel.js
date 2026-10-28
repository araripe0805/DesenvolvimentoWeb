import mongoose from 'mongoose';

const horarioSchema = new mongoose.Schema({
    quadra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra',
        required: true
    },

    diaSemana: {
        type: String,
        required: true,
        enum: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
    },

    horaInicio: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):[0-5]\d$/  //Formato HH:mm
    },

    horaFim: {
        type: String,
        required: true,
        match: /^([01]\d|2[0-3]):[0-5]\d$/  // Formato HH:mm
    },

    ativo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

horarioSchema.index({  // indice para ajudar na busca de horários disponíveis para uma 
    quadra: 1,         // quadra específica em um dia da semana específico no mongoDB
    diaSemana: 1,
    horaInicio: 1
});

export default mongoose.model('Horario', horarioSchema);
