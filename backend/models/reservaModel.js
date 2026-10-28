import mongoose from 'mongoose';

const reservaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    quadra: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quadra',
        required: true
    },

    horario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Horario',
        required: true
    },

    data: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ['confirmada', 'cancelada'],
        default: 'confirmada'
    },

    canceladaPor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    dataCancelamento: {
        type: Date,
        default: null
    }
}, {
    timestamps: true
});

reservaSchema.index({
    quadra: 1,
    data: 1,
    horario: 1
});

export default mongoose.model('Reserva', reservaSchema);
