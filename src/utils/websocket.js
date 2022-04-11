const moment = require('moment');
const { normalize, schema } = require('normalizr')
const { MessagessDaoMongoDb } = require('../models/daos/index')
const messagesApi = new MessagessDaoMongoDb();

const author = new schema.Entity('author');
const msg = new schema.Entity('msg', {
    author: author
}, { idAttribute: '_id' });

const msgs = new schema.Entity('msgs', {
    authors: [author],
    messages: [msg]
});

const webSocket = async (io) => {
    io.on('connection', async (socket) => {
        try {
            moment.locale('es-mx');
            const messages = await messagesApi.getAll();
            const norm = normalize({ id: 'mensajes', messages: [...messages] }, msgs);
            socket.emit('messages', norm);

            socket.on('newMessage', async (data) => {
                await messagesApi.insert({ author: data.author, text: data.text, datetime: moment().format('LLLL') });
                const messages = await messagesApi.getAll();
                const norm = normalize({ id: 'mensajes', messages: [...messages] }, msgs);
                io.emit('messages', norm);
            })
        } catch (error) {
            console.error(error);
        }

    })
}
module.exports = { webSocket };