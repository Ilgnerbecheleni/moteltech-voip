// app.js
const { httpsServer, startServer } = require('./backend/web-server');
const { setupWebSocket } = require('./backend/websocket-server');

setupWebSocket(httpsServer);
startServer();
