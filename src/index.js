const express = require('express');
const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({ msg: 'Hola mundo' })
})
const connectedServer = app.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`);
});
connectedServer.on('error', (error) => {
    console.log('Error: ', error);
})

