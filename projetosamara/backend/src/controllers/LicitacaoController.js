const Licitacao = require('../models/Licitacao');
const graficoValoresPorMunicipio = require('./graficos/GraficoDeValores');
const graficoDeMunicipios = require('./graficos/GraficoDeMunicipios');
const graficoTopNegociadoresPorMunicipio = require('./graficos/GraficoTopNegociadores');
const graficoTopLicitacoesNaSemanaPorMunicipio = require('./graficos/GraficoDeFrequenciaSemana');

const getFilter = (request) => {
    const filter = {}

    if (typeof request.query.codigoMunicipio !== 'undefined') {
        filter.codigoMunicipio = request.query.codigoMunicipio
    }

    if (typeof request.query.dateInterval !== 'undefined' && request.query.dateInterval.length == 2) {
        filter.dataRealizacaoLicitacao = {
            $gte: new Date(request.query.dateInterval[0]),
            $lte: new Date(request.query.dateInterval[1]),
        }
    }

    return filter;
}

module.exports = {
    async graficoTopLicitacoesNaSemanaPorMunicipio(request, response) {
        if (!request.query.codigoMunicipio) {
            return response.json({}, 204);
        }

        const responseJson = await graficoTopLicitacoesNaSemanaPorMunicipio(getFilter(request));

        return response.json(responseJson);
    },
    async graficoTopNegociadoresPorMunicipio(request, response) {
        if (!request.query.codigoMunicipio) {
            return response.json({}, 204);
        }

        const responseJson = await graficoTopNegociadoresPorMunicipio(getFilter(request));

        return response.json(responseJson);
    },
    async graficoValoresPorMunicipio(request, response) {
        if (!request.query.codigoMunicipio) {
            return response.json({}, 204);
        }

        const responseJson = await graficoValoresPorMunicipio(getFilter(request));

        return response.json(responseJson);
    },
    async graficoValoresGerais(request, response) {
        let filters = getFilter(request);
        delete filters.codigoMunicipio;

        const responseJson = await graficoValoresPorMunicipio(filters);

        return response.json(responseJson);
    },
    async graficoDeMunicipios(request, response) {
        let filters = getFilter(request);
        delete filters.codigoMunicipio;

        const responseJson = await graficoDeMunicipios(filters);

        return response.json(responseJson);
    },
    async index(request, response) {
        const licitacoes = await Licitacao.find(getFilter(request), {
            _id: 0, __v: 0
        });
        const responseJson = [];

        for (let i = 0; i < licitacoes.length; i++) {     

            let { 
                numeroLicitacao, 
                codigoMunicipio, 
                dataRealizacaoLicitacao, 
                descricaoObjetoLicitacao,
                valorOrcadoEstimado,
                valorLimiteSuperior,
                negociante
            } = licitacoes[i];

            valorOrcadoEstimado = parseFloat(valorOrcadoEstimado.toString());
            valorLimiteSuperior = parseFloat(valorLimiteSuperior.toString());

            responseJson.push({ 
                numeroLicitacao, 
                codigoMunicipio, 
                dataRealizacaoLicitacao, 
                descricaoObjetoLicitacao,
                valorOrcadoEstimado,
                valorLimiteSuperior,
                negociante
            });
        }

        return response.json(responseJson);
    }
}