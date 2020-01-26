#!/usr/bin/env node

const program = require('commander');
const municipios = require('./municipios');
const licitacoes = require('./licitacoes');
const dbConnect = require('../connection');

const chalk = require('chalk');

program.version('0.0.1');

program
    .command('pull [data_intervalo]')
    .description('Atualiza dados relacionados a Licitações de todas as cidades no MongoDB')
    .action(async (data_intervalo) => {
        if (typeof data_intervalo !== 'string') {
            console.log('data_intervalo faltando!');
            return;
        }

        await dbConnect();

        await municipios.update(async ({ codigo, nome}) => {
            console.log(`${chalk.whiteBright("Buscando por licitações de " + nome)}`);
            await licitacoes.update(codigo, data_intervalo, { doNotConnectToDatabase : true })
        }, { doNotConnectToDatabase : true });

        dbConnect.disconnect();
    });

program
    .command('municipios:pull')
    .description('Atualiza a lista de cidades no MongoDB')
    .action(municipios.update);

program
    .command('municipios:list [nome_da_cidade]')
    .description('Lista todos municípios cadastrados no MongoDB')
    .action(municipios.listAll);

program
    .command('licitacoes:pull [codigo_municipio] [data_intervalo]')
    .description('Atualiza os dados relacionados a Licitações no MongoDB')
    .action(licitacoes.update);

program
    .command('licitacoes:list [codigo_municipio]')
    .description('Lista todas licitacoes cadastrados no MongoDB')
    .action(licitacoes.listAll);

program
    .command('items-licitacoes:pull [codigo_municipio] [data_intervalo]')
    .description('Atualiza os items relacionados a Licitações no MongoDB')
    .action(licitacoes.updateItems);

program.parse(process.argv);