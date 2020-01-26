module.exports = {
    mongoDBConnectionUrl: () => 'mongodb://localhost:27017/samara?retryWrites=true&?authSource=admin',
    apiBaseUrl: () => 'https://api.tce.ce.gov.br/index.php/sim/1_0',
}