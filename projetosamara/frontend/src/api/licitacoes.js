const axios = require('axios')
const apiBaseUrl = require('../config').apiBaseUrl()

const prepareDateInterval = (anoExercicio) => {
  return anoExercicio ? {
    dateInterval: [
      `${anoExercicio}-01-01`,
      `${anoExercicio}-12-31`
    ]
  } : {}
}

module.exports = {
  async graficoValoresGerais (anoExercicio = 2010) {
    const resp = await axios({
      url: `${apiBaseUrl}/licitacoes/grafico-valores-estado`,
      params: {
        ...prepareDateInterval(anoExercicio)
      }
    })

    return resp.data
  },

  async graficoValoresPorMunicipio (codigoMunicipio, anoExercicio = 2010) {
    const resp = await axios({
      url: `${apiBaseUrl}/licitacoes/grafico-valores-municipio`,
      params: {
        codigoMunicipio,
        ...prepareDateInterval(anoExercicio)
      }
    })

    return resp.data
  },

  async graficoDeMunicipios (anoExercicio = 2010) {
    const resp = await axios({
      url: `${apiBaseUrl}/licitacoes/grafico-municipios`,
      params: {
        ...prepareDateInterval(anoExercicio)
      }
    })

    return resp.data
  },

  async graficoTopNegociadoresPorMunicipio (codigoMunicipio, anoExercicio = 2010) {
    const resp = await axios({
      url: `${apiBaseUrl}/licitacoes/grafico-top-negociadores`,
      params: {
        codigoMunicipio,
        ...prepareDateInterval(anoExercicio)
      }
    })

    return resp.data
  },

  async graficoTopLicitacoesNaSemanaPorMunicipio (codigoMunicipio, anoExercicio = 2010) {
    const resp = await axios({
      url: `${apiBaseUrl}/licitacoes/grafico-semanal`,
      params: {
        codigoMunicipio,
        ...prepareDateInterval(anoExercicio)
      }
    })

    return resp.data
  }
}
