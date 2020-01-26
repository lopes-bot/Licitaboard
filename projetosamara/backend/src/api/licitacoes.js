const axios = require('axios');
const apiBaseUrl = require('../config').apiBaseUrl();
const chalk = require('chalk');

module.exports = {
    async listByData(codigoMunicipio='002', dataRealizacaoAutuacaoLicitacao='20100101_20100115') {
        const resp = await axios.get(`${apiBaseUrl}/licitacoes.json?codigo_municipio=${codigoMunicipio}&data_realizacao_autuacao_licitacao=${dataRealizacaoAutuacaoLicitacao}`);

        if (!resp.data || !resp.data.rsp || !resp.data.rsp._content) {
            console.log(`${chalk.redBright("API do TCE retornou um resultado inesperado ou mau formatado!")}`);
            return [];
        }

        return resp.data.rsp._content;
    },

    async listOfLicitantes(codigoMunicipio='002', dataRealizacaoAutuacaoLicitacao='20100101_20100115') {
        const resp = await axios.get(`${apiBaseUrl}/licitantes.json?codigo_municipio=${codigoMunicipio}&data_realizacao_licitacao=${dataRealizacaoAutuacaoLicitacao}`);

        if (!resp.data || !resp.data.rsp || !resp.data.rsp._content) {
            console.log(`${chalk.redBright("API do TCE retornou um resultado inesperado ou mau formatado!")}`);
            return [];
        }

        return resp.data.rsp._content;
    },

    async listOfItemsOfLicitacoes(codigoMunicipio='002', dataRealizacaoAutuacaoLicitacao='20100101_20100115') {
        const resp = await axios.get(`${apiBaseUrl}/itens_licitacoes.json?codigo_municipio=${codigoMunicipio}&data_realizacao_licitacao=${dataRealizacaoAutuacaoLicitacao}`);

        if (!resp.data || !resp.data.rsp || !resp.data.rsp._content) {
            console.log(`${chalk.redBright("API do TCE retornou um resultado inesperado ou mau formatado!")}`);
            return [];
        }

        return resp.data.rsp._content;
    }
}