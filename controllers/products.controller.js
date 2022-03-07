const { ProductsApi } = require('../models')
const productsApiFs = new ProductsApi('products.txt')

const getProductsController = async (req, res) => {
    let result = [];
    if (req.params.id) {
        const id = +req.params.id;
        if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
        result = await productsApiFs.getProductById(id)
    } else {
        result = await productsApiFs.getAllProducts();
    }
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const addProductController = async (req, res) => {
    const product = {
        title,
        description,
        code,
        thumnail,
        price,
        stock,
    } = req.body;
    const emptyValues = !title || !description || !code || !thumnail || !price || !stock;
    if (emptyValues) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    }
    if (isNaN(price)) {
        return res.status(400).json({ error: 'Price debe ser un numero' });
    } else {
        result = await productsApiFs.addProduct({ ...product, price: +price });
        return !result.error ?
            res.json({ success: true, result }) :
            res.json({ success: false, result: result.error });
    }
}
const updProductController = async (req, res) => {
    const product = {
        title,
        price,
        thumbnail
    } = req.body;
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
    if (isNaN(price)) { return res.status(400).json({ error: 'Price debe ser un numero' }); }
    if (!title || !price || !thumbnail) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    } else {
        result = await productsApiFs.updateProduct({ ...product, id });
        return !result.error ?
            res.json({ success: true, result }) :
            res.json({ success: false, result: result.error });
    }
}
const deleteProductController = async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
    result = await productsApiFs.deleteProdById(id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
module.exports = {
    getProductsController,
    addProductController,
    updProductController,
    deleteProductController
}