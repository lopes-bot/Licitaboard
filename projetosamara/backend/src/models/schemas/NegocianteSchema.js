const mongoose = require('mongoose');

const NegocianteSchema = new mongoose.Schema({
    numeroDocumento: String,
    nome: String,
    nomeMunicipio: String,
    ufMunicipio: String,
});

module.exports = NegocianteSchema;