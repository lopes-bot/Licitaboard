const Licitacao = require('../../models/Licitacao');
const Municipio = require('../../models/Municipio');

module.exports = async (filters={}) => {
    const licitacoes = await Licitacao.aggregate([
        { $match: filters },
        { $group: { 
            _id : "$codigoMunicipio",
            totalValorOrcadoEstimado: { $sum: "$valorOrcadoEstimado" },
            totalValorLimiteSuperior: { $sum: "$valorLimiteSuperior" },
        }},
        { $sort : { _id : 1 } }
    ]);

    const responseJson = [];

    for (let i = 0; i < licitacoes.length; i++) {     

        let {  
            _id, 
            totalValorOrcadoEstimado,
            totalValorLimiteSuperior
        } = licitacoes[i];

        const municipio = await Municipio.findOne({
            codigo: _id
        }, { 
            nome: 1
        });

        totalValorOrcadoEstimado = parseFloat(totalValorOrcadoEstimado.toString()) || 0;
        totalValorLimiteSuperior = parseFloat(totalValorLimiteSuperior.toString()) || 0;

        responseJson.push({
            _id, 
            nomeMunicipio: municipio?municipio.nome:null,
            totalValorOrcadoEstimado,
            totalValorLimiteSuperior,
        });
    }

    return responseJson;
}