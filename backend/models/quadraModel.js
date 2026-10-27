const mongoose = require('mongoose');

const quadraSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    
    tipo: {
        type: String,
        enum: ['areia', 'grama', 'sintetico', 'cimento'],
        required: true,
    },
    
    localizacao: {
        type: String,
        required: true,
    },
    
    capacidade: {
        type: Number,
        required: true,
        min: 1
    },
    
    preco: {
        type: Number,
        required: true,
        min: 0
    },
    
    largura: {
        type: Number,
        required: true,
        min: 0
    },
    
    comprimento: {
        type: Number,
        required: true,
        min: 0
    },
    
    descricao: {
        type: String,
        default: ''
    },
    
    imagem: {
        type: String,
        default: ''
    },
    
    ativo: {
        type: Boolean,
        default: true
    },
    
    administrador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Quadra', quadraSchema);