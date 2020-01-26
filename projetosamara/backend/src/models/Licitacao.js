const mongoose = require('mongoose');
const NegocianteSchema = require('./schemas/NegocianteSchema')

const LicitacaoSchema = new mongoose.Schema({
    numeroLicitacao: String,
    codigoMunicipio: String,
    dataRealizacaoLicitacao: { type: Date, default: Date.now },
    descricaoObjetoLicitacao: String,
    valorOrcadoEstimado: mongoose.Decimal128,
    valorLimiteSuperior: mongoose.Decimal128,
    negociante: {
        type: NegocianteSchema,
        default: null
    }
});

module.exports = mongoose.model('Licitacao', LicitacaoSchema);