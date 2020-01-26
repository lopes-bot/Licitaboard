const Licitacao = require('../../models/Licitacao');

module.exports = async (filters={}, limit=10) => {
    const licitacoes = await Licitacao.aggregate([
        { $match: filters },
        { $group: { 
            _id : "$negociante.numeroDocumento" ,
            negociante: { $first : "$negociante" },
            totalValorOrcadoEstimado: { $sum: "$valorOrcadoEstimado" }
        }},
        { $sort : { totalValorOrcadoEstimado : -1 } }
    ]).limit(limit);

    const responseJson = [];

    for (let i = 0; i < licitacoes.length; i++) {     
        let {  
            _id,
            negociante,
            totalValorOrcadoEstimado,
        } = licitacoes[i];

        totalValorOrcadoEstimado = parseFloat(totalValorOrcadoEstimado.toString()) || 0;
        const negocianteNome = negociante.nome;
        const negocianteCidade = negociante.nomeMunicipio + '/' + negociante.ufMunicipio;

        responseJson.push({
            _id, 
            negocianteNome,
            negocianteCidade,
            totalValorOrcadoEstimado,
        });
    }

    return responseJson;
}