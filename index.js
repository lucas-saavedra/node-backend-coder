const express = require('express');
const { Contenedor } = require('./helpers/Contenedor');
const contenedor = new Contenedor('productos.txt');
const PORT = process.env.PORT || 8080;
const app = express();

app.get('/productos', async (req, res) => {
    res.json(await contenedor.getAll());
});

app.get('/productoRandom', async (req, res) => {
    res.json(await contenedor.productoRandom());
});

app.listen(PORT, () => {
    console.log(`Listening at: ${PORT}`)
});

