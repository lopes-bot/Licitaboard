const path = require('path');
const express = require('express');
const dbConnect = require('./connection');
const cors =  require('cors');

const router = require('./router');

const serverPort = process.env.PORT || 3000;

const app = express();

// Permite acesso externo
app.use(cors());
// Desativa o X-Powered-By: Express
app.disable('x-powered-by');
app.use(express.json());
app.use(router);

// SPA
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

dbConnect()
    .then(() => app.listen(serverPort, () => {
        console.log(`Server running at http://localhost:${serverPort}`);
    }))
    .catch(err => console.log(err))
