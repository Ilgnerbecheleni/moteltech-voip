const fs = require('fs');
const path = require('path');
const express = require('express');
const https = require('https');

const PORT = 12500;
const publicDir = path.join(__dirname, '..', 'frontend', 'public'); // Corrigido

const keyPath = path.join(__dirname, 'cert', 'key.pem');
const certPath = path.join(__dirname, 'cert', 'cert.pem');

const app = express();

// Servir arquivos estáticos (html, js, css, etc.)
app.use(express.static(publicDir));

// Se alguém acessar / diretamente, redireciona para reception.html
app.get('/', (req, res) => {
    res.sendFile(path.join(publicDir, 'reception.html'));
});

// Criação do servidor HTTPS com Express
const httpsServer = https.createServer({
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath)
}, app);

// Função para iniciar o servidor
function startServer() {
    httpsServer.listen(PORT, () => {
        console.log(`HTTPS server running at https://localhost:${PORT}`);
    });
}

module.exports = {
    httpsServer,
    startServer
};
