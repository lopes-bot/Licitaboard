const Licitacao = require('../../models/Licitacao');

module.exports = async (filters={}) => {
    const licitacoes = await Licitacao.aggregate([
        { $match: filters },
        { $group: { 
            _id : { $dayOfWeek: "$dataRealizacaoLicitacao" },
            totalLicitacoes: { $sum: 1 },
            mediaValorOrcadoEstimado: { $avg: "$valorOrcadoEstimado" },
        }},
        { $sort : { _id : 1 } }
    ]);

    const responseJson = [];
    for (let i = 1; i <= 7; i++) {
        responseJson.push({
            diaDaSemana: i,
            totalLicitacoes: 0,
            mediaValorOrcadoEstimado: 0
        });
    }

    for (let i = 0; i < licitacoes.length; i++) {
        let {  
            _id, 
            totalLicitacoes,
            mediaValorOrcadoEstimado
        } = licitacoes[i];

        mediaValorOrcadoEstimado = parseFloat(mediaValorOrcadoEstimado.toString()) || 0;

        let day = responseJson.find(d => d.diaDaSemana === _id);

        day.totalLicitacoes = totalLicitacoes;
        day.mediaValorOrcadoEstimado = mediaValorOrcadoEstimado;
    }

    return responseJson;
}