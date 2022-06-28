import app from './index.js'
import config from '../config.js';
import http from 'http'
const PORT = config.PORT || 8080;

const server = http.createServer(app);

server.listen(PORT);

server.on('listening', () => {
    console.log('El servidor está escuchando en el puerto' + PORT);
});