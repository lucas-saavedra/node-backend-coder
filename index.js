const express = require('express')
const moment = require('moment');
const { Server: IOServer } = require('socket.io')
const { Server: HttpServer } = require('http')
const { MessagesContainer } = require('./helpers/MessagesContainer')

const apiRoutes = require('./routers/index');
const PORT = process.env.PORT || 8080;

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer)


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const { ProductsApi } = require('./models/index')
const { productsData } = require('./data/data');
const req = require('express/lib/request');
const productsApi = new ProductsApi([]);
const msgContainer = new MessagesContainer('chatList.txt')


const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`);
});

connectedServer.on('error', (error) => {
    console.log('Error: ', error);
})

let messages = [];
io.on('connection', (socket) => {
    const products = productsApi.getAll();
    socket.emit('products', products)
    socket.on('newProduct', (data) => {
        productsApi.addProduct(data);
        const products = productsApi.getAll();
        io.emit('products', products);
    })
    moment.locale('es-mx');
    msgContainer.getAll()
        .then(result => { socket.emit('messages', result) })
        .catch(error => console.error(error))

    socket.on('newMessage', async (data) => {
        await msgContainer.save({ ...data, datetime: moment().format('LLLL') });
        msgContainer.getAll()
            .then(result => { io.emit('messages', result) })
            .catch(error => console.error(error))
    })

})
