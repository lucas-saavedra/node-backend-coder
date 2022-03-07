const { CartApi } = require('../models')
const cartApiFs = new CartApi('carts.txt');

const getCartsController = async (req, res) => {
    result = await cartApiFs.getAllCarts();
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const newCartController = async (req, res) => {
    result = await cartApiFs.newCart();
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });

}
const getCartByIdController = async (req, res) => {
    const cartId = +req.params.id;
    if (isNaN(cartId)) { return res.status(400).json({ error: 'Id debe ser un numero' }); }
    result = await cartApiFs.getCartById(cartId);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });
}
const addNewProductToCartController = async (req, res) => {
    const product = {
        id,
        title,
        description,
        code,
        thumnail,
        price,
        stock,
    } = req.body;
    const cartId = +req.params.id;
    const emptyValues = !id || !cartId || !title || !description || !code || !thumnail || !price || !stock;
    if (isNaN(id)) { return res.status(400).json({ error: 'Id debe ser un numero' }); }
    if (isNaN(price)) { return res.status(400).json({ error: 'Price debe ser un numero' }); }
    if (emptyValues) {
        return res.status(400).json({ error: 'Debe completar todos los campos' });
    } else {
        result = await cartApiFs.addNewProductToCart({ ...product, price: +price }, cartId);
        return !result.error ?
            res.json({ success: true, result }) :
            res.json({ success: false, result: result.error });
    }
}
const deleteCartByIdController = async (req, res) => {
    const id = +req.params.id;
    if (isNaN(id)) { return res.status(400).json({ error: 'ID debe ser un numero' }); }
    result = await cartApiFs.deleteCartById(id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });
}

const delProductFromCartByIdsController = async (req, res) => {
    const id = +req.params.id;
    const idProd = +req.params.idProduct;
    if (isNaN(id)) { return res.status(400).json({ error: 'Cart Id debe ser un numero' }); }
    if (isNaN(idProd)) { return res.status(400).json({ error: 'Product Id debe ser un numero' }); }
    result = await cartApiFs.deleteProductFromCartByIds(idProd, id);
    return !result.error ?
        res.json({ success: true, result }) :
        res.json({ success: false, result: result.error });
}

module.exports = {
    newCartController,
    getCartsController,
    getCartByIdController,
    addNewProductToCartController,
    deleteCartByIdController,
    delProductFromCartByIdsController
}
