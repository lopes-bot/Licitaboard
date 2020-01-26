const dbConnect = require('../connection');
const Licitacao = require('../models/Licitacao');
const ItemLicitacao = require('../models/ItemLicitacao');
const licitacoes = require('../api/licitacoes');
const chalk = require('chalk');
const Table = require('cli-table');

module.exports = {
    async update(codigoMunicipio, dataIntervalo, options = { doNotConnectToDatabase : false }) {
        // Loading from api
        console.log(`${chalk.blue("Acessando Base de dados do TCE...")}`);
        const result = await licitacoes.listByData(codigoMunicipio, dataIntervalo);
        const negociantes = await licitacoes.listOfLicitantes(codigoMunicipio, dataIntervalo);

        // Options
        options = typeof options === 'object' ? options : {};

        // Database connect
        if (!options.doNotConnectToDatabase) {
            console.log(`${chalk.blue("Conectando a base de dados local...")}`);
            await dbConnect();
        }

        // Update cities
        console.log(`${chalk.blue("Atualizando lista de licitações...")}`);
        for (const licitacao of result) {
            const found = await Licitacao.findOne({ numeroLicitacao: licitacao.numero_licitacao });
            if(found) {
                continue;
            }

            let negociante = negociantes.find((el) => el.numero_licitacao === licitacao.numero_licitacao);
            if (negociante) {
                negociante = {
                    numeroDocumento: negociante.numero_documento_negociante,
                    nome: negociante.nome_negociante,
                    nomeMunicipio: negociante.nome_municipio_negociante,
                    ufMunicipio: negociante.codigo_uf,
                }
            }            

            // The database has some missing dates, so far so good.
            const isoDateString = `${licitacao.data_realizacao_licitacao.trim().split(' ')[0]}T${licitacao.hora_licitacao.trim()}:00.000-03:00`;
            let isoFormatedDate = new Date(isoDateString);
            if(isNaN(isoFormatedDate.getTime())) {
                isoFormatedDate = new Date(licitacao.data_homologacao);
            }
            if(isNaN(isoFormatedDate.getTime())) {
                isoFormatedDate = new Date(licitacao.data_criacao_comissao);
            }
            if(isNaN(isoFormatedDate.getTime())) {
                isoFormatedDate = new Date(licitacao.data_realizacao_autuacao_licitacao);
            }

            await Licitacao.create({
                numeroLicitacao: licitacao.numero_licitacao.trim(),
                codigoMunicipio: licitacao.codigo_municipio.trim(),
                dataRealizacaoLicitacao: isoFormatedDate,
                descricaoObjetoLicitacao: licitacao.descricao1_objeto_licitacao + ' ' + licitacao.descricao2_objeto_licitacao,
                valorOrcadoEstimado: parseFloat(licitacao.valor_orcado_estimado),
                valorLimiteSuperior: parseFloat(licitacao.valor_limite_superior),
                negociante
            });

            console.log(`${chalk.blueBright("Licitação " + licitacao.numero_licitacao + " cadastrada!")}`);
        }

        // Log
        console.log(`${chalk.green("Licitações atualizadas")}`);
        
        // Disconnect
        if (!options.doNotConnectToDatabase) {
            dbConnect.disconnect();
        }
    },
    async updateItems() {
        // Loading from api
        console.log(`${chalk.blue("Acessando Base de dados do TCE...")}`);
        const result = await licitacoes.listOfItemsOfLicitacoes();

        // Database connect
        console.log(`${chalk.blue("Conectando a base de dados local...")}`);
        await dbConnect();

        // Update cities
        console.log(`${chalk.blue("Atualizando lista de items de licitações...")}`);
        for (const itemLicitacao of result) {
            const found = await ItemLicitacao.findOne({ 
                numeroLicitacao: itemLicitacao.numero_licitacao,
                numeroSequencialItemLicitacao: itemLicitacao.numero_sequencial_item_licitacao,
            });
            if(found) {
                continue;
            }         

            await ItemLicitacao.create({
                numeroLicitacao: itemLicitacao.numero_licitacao.trim(),
                codigoMunicipio: itemLicitacao.codigo_municipio.trim(),
                numeroSequencialItemLicitacao: parseInt(itemLicitacao.numero_sequencial_item_licitacao),

                descricaoItemLicitacao: itemLicitacao.descricao_item_licitacao.trim(),
                descricaoUnidadeItemLicitacao: itemLicitacao.descricao_unidade_item_licitacao.trim(),

                valorVencedorItemLicitacao: parseFloat(itemLicitacao.valor_vencedor_item_licitacao),                
                numeroQuantidadeItemLicitacao: parseFloat(itemLicitacao.numero_quantidade_item_licitacao),
                valorUnitarioItemLicitacao: parseFloat(itemLicitacao.valor_unitario_item_licitacao)
            });

            console.log(`${chalk.blueBright("Item " + itemLicitacao.numero_sequencial_item_licitacao + " da licitação " + itemLicitacao.numero_licitacao + " cadastrado!")}`);
        }

        // Log
        console.log(`${chalk.green("Items de licitações atualizados")}`);
        
        // Disconnect
        dbConnect.disconnect();
    },
    async listAll(codigo_municipio) {
        if (typeof codigo_municipio !== 'string') {
            console.log(`${chalk.redBright("Código do município não informado!")}`);
            return;
        }

        // Database connect
        console.log(`${chalk.blue("Conectando a base de dados local...")}`);
        await dbConnect();

        // List all
        console.log(`${chalk.blue("Buscando lista de licitacoes...")}`);
        let _licitacoes = await Licitacao.find({
            codigoMunicipio: codigo_municipio.trim()
        }).limit(100);

        // Show
        const table = new Table({
            head: ['Numero Licitacao', 'Data', 'Objeto Licitacao', 'Valor Orçado Estimado', 'Valor Limite Superior', 'Negociante'],
            colWidths: [20, 15, 30, 15, 15, 30]
        });
        _licitacoes.forEach(licitacao => {
            table.push([
                licitacao.numeroLicitacao, 
                licitacao.dataRealizacaoLicitacao || ' - ', 
                licitacao.descricaoObjetoLicitacao || ' - ',
                licitacao.valorOrcadoEstimado || 0,
                licitacao.valorLimiteSuperior || 0,
                licitacao.negociante ? licitacao.negociante.nome : '',
            ]);
        });
        console.log(table.toString());

        // Disconnect
        dbConnect.disconnect();
    }
}