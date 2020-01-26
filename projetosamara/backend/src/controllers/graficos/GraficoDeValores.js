const Licitacao = require('../../models/Licitacao');

module.exports = async (filters={}) => {
    const licitacoes = await Licitacao.aggregate([
        { $match: filters },
        { $group: { 
            _id : { year: { $year : "$dataRealizacaoLicitacao" }, month: { $month : "$dataRealizacaoLicitacao" } },
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

        _id = `${_id.year}-${_id.month<10?'0'+_id.month:_id.month}`;

        totalValorOrcadoEstimado = parseFloat(totalValorOrcadoEstimado.toString()) || 0;
        totalValorLimiteSuperior = parseFloat(totalValorLimiteSuperior.toString()) || 0;

        responseJson.push({
            _id, 
            totalValorOrcadoEstimado,
            totalValorLimiteSuperior
        });
    }

    return responseJson;
}