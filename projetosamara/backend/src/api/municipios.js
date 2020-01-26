const axios = require('axios');
const apiBaseUrl = require('../config').apiBaseUrl();
const chalk = require('chalk');

module.exports = {
    async listAll() {
        const resp = await axios.get(`${apiBaseUrl}/municipios.json`);

        if (!resp.data || !resp.data.rsp || !resp.data.rsp._content) {
            console.log(`${chalk.redBright("API do TCE retornou um resultado inesperado ou mau formatado!")}`);
            return [];
        }

        return resp.data.rsp._content;
    }
}