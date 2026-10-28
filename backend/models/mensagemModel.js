import mongoose from 'mongoose';

const mensagemSchema = new mongoose.Schema({
    remetente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    conteudo: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000
    },

    lida: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

mensagemSchema.index({
    remetente: 1,
    destinatario: 1,
    createdAt: -1
});

export default mongoose.model('Mensagem', mensagemSchema);