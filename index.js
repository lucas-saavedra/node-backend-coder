const express = require('express');
const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const { webSocket } = require('./src/utils/websocket');
const PORT = process.env.PORT || 8080;
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const { faker } = require('@faker-js/faker');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/api/productos-test', (req, res) => {
    let products = [];
    for (let i = 0; i < 5; i++) {
        products.push({
            price: faker.commerce.price(100, 1000, 0),
            title: faker.commerce.product(),
            thumbnail: faker.image.food(640, 480, true)
        })
    }
    res.json({ products })
})

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log('Error: ', error);
})

webSocket(io);
