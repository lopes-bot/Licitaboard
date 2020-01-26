const { Router } = require('express');
const LicitacaoController = require('../controllers/LicitacaoController');
const MunicipioController = require('../controllers/MunicipioController');

const routes = Router();

routes.get('/api/v1/municipios', MunicipioController.index);
routes.get('/api/v1/licitacoes', LicitacaoController.index);

routes.get('/api/v1/licitacoes/grafico-valores-estado', LicitacaoController.graficoValoresGerais);
routes.get('/api/v1/licitacoes/grafico-valores-municipio', LicitacaoController.graficoValoresPorMunicipio);
routes.get('/api/v1/licitacoes/grafico-municipios', LicitacaoController.graficoDeMunicipios);
routes.get('/api/v1/licitacoes/grafico-top-negociadores', LicitacaoController.graficoTopNegociadoresPorMunicipio);
routes.get('/api/v1/licitacoes/grafico-semanal', LicitacaoController.graficoTopLicitacoesNaSemanaPorMunicipio);

module.exports = routes;