const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },

    matricula: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    telefone: {
        type: String,
        required: true,
        trim: true
    },
    senha: {
        type: String,
        required: true,
    },
    tipoUser: {
        type: String,
        enum: ['usuario', 'admin'],
        default: 'usuario'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);