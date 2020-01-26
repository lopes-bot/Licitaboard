const mongoose = require('mongoose');
const config = require('./config')

module.exports = async () => {
    mongoose.Promise = global.Promise
    return mongoose.connect(config.mongoDBConnectionUrl(), {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports.disconnect = () => mongoose.disconnect();