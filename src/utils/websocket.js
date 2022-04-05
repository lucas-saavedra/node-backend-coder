const moment = require('moment');

const { MessagessDaoMongoDb } = require('../models/daos/index')
const messagesApi = new MessagessDaoMongoDb();
const webSocket = async (io) => {
    io.on('connection', async (socket) => {
        try {

            moment.locale('es-mx');
            const messages = await messagesApi.getAll();
            socket.emit('messages', messages)
            socket.on('newMessage', async (data) => {
                await messagesApi.insert({ ...data, datetime: moment().format('LLLL') });
                const messages = await messagesApi.getAll();
                io.emit('messages', messages);
            })
        } catch (error) {
            console.error(error)
        }

    })
}
module.exports = { webSocket };