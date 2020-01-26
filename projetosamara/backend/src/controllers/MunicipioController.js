const Municipio = require('../models/Municipio');

module.exports = {
    async index(request, response) {
        const municipios = await Municipio.find({}, { 
            _id:0, nome:1, codigo:1 
        });

        return response.json(municipios);
    }
}