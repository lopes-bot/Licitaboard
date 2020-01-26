const mongoose = require('mongoose');

const MunicipioSchema = new mongoose.Schema({
    codigo: String,
    nome: String,
    geoibgeId: Number
});

module.exports = mongoose.model('Municipio', MunicipioSchema);