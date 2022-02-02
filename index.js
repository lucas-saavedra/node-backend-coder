const express = require('express');
const { Contenedor } = require('./helpers/Contenedor');
const contenedor = new Contenedor('productos.txt');
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/productos', (req, res) => {
    contenedor.getAll()
        .then(result => res.send(result))
        .catch(error => console.error(error))
});

app.get('/productoRandom', (req, res) => {
    contenedor.productoRandom()
        .then(result => res.send(result))
        .catch(error => console.error(error))
});

app.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`)
});

