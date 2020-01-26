const mongoose = require('mongoose');

const ItemLicitacaoSchema = new mongoose.Schema({
    numeroLicitacao: String,
    codigoMunicipio: String,
    numeroSequencialItemLicitacao: Number,

    descricaoItemLicitacao: String,
    descricaoUnidadeItemLicitacao: String,

    valorVencedorItemLicitacao: mongoose.Decimal128,                
    numeroQuantidadeItemLicitacao: mongoose.Decimal128,
    valorUnitarioItemLicitacao: mongoose.Decimal128
});

module.exports = mongoose.model('ItemLicitacao', ItemLicitacaoSchema);