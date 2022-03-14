const moment = require('moment');
const { config } = require('../db/config')
const { ProductsApi, MessagesApi } = require('../models/index')
const productsApi = new ProductsApi(config.madiadb, 'products');
const messagesApi = new MessagesApi(config.sqlite, 'messages');

const webSocket = async (io) => {
    io.on('connection', async (socket) => {
        try {
            const products = await productsApi.getAll();
            socket.emit('products', products)
            socket.on('newProduct', async (data) => {
                await productsApi.addProduct(data);
                const products = await productsApi.getAll();
                io.emit('products', products);
            })
            moment.locale('es-mx');

            const messages = await messagesApi.getAll()
            socket.emit('messages', messages)

            socket.on('newMessage', async (data) => {
                await messagesApi.addMessage({ ...data, datetime: moment().format('LLLL') });
                const messages = await messagesApi.getAll();
                io.emit('messages', messages);
            })
        } catch (error) {
            console.error(error)
        }

    })
}
module.exports = { webSocket };