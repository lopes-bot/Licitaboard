const dbConnect = require('../connection');
const Municipio = require('../models/Municipio');
const municipios = require('../api/municipios');
const chalk = require('chalk');
const Table = require('cli-table');

module.exports = {
    async update(callback = null, options = { doNotConnectToDatabase : false }) {
        // Loading list of cities
        console.log(`${chalk.blue("Acessando Base de dados do TCE...")}`);
        const result = await municipios.listAll();

        // Options
        options = typeof options === 'object' ? options : {};

        // Database connect
        if (!options.doNotConnectToDatabase) {
            console.log(`${chalk.blue("Conectando a base de dados local...")}`);
            await dbConnect();
        }

        // Update cities
        console.log(`${chalk.blue("Atualizando lista de municípios...")}`);
        for (const municipio of result) {
            const found = await Municipio.findOne({ codigo: municipio.codigo_municipio });
            if(found) {
                if (typeof callback === 'function') {
                    await callback(found);
                }
                continue;
            }

            const dbMunicipio = await Municipio.create({
                codigo: municipio.codigo_municipio.trim(),
                nome: municipio.nome_municipio.trim(),
                geoibgeId: municipio.geoibgeId.trim(),
            });

            console.log(`${chalk.blueBright("Município de " + municipio.nome_municipio + " cadastrado!")}`);

            if (typeof callback === 'function') {
                await callback(dbMunicipio);
            }
        }

        console.log(`${chalk.green("Todos municipios atualizados")}`);
        
        // Disconnect
        if (!options.doNotConnectToDatabase) {
            dbConnect.disconnect();
        }
    },
    async listAll(search) {
        // Database connect
        console.log(`${chalk.blue("Conectando a base de dados local...")}`);
        await dbConnect();

        // List all
        console.log(`${chalk.blue("Buscando lista de municipios...")}`);
        let municipios = [];
        if (typeof search === 'string') {
            municipios = await Municipio.find({
                nome: new RegExp(`${search}`, 'i')
            });
        } else {
            municipios = await Municipio.find();
        }

        // Show
        const table = new Table({
            head: ['codigo', 'nome', 'geoibgeId'],
            colWidths: [10, 20, 10]
        });
        municipios.forEach(municipio => {
            table.push([
                municipio.codigo, municipio.nome, municipio.geoibgeId
            ])
        });
        console.log(table.toString());

        // Disconnect
        dbConnect.disconnect();
    }
}