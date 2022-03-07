const express = require('express');
const { auth } = require('../../utils/middleware')
const router = express.Router();
const {
    newCartController,
    getCartsController,
    getCartByIdController,
    addNewProductToCartController,
    deleteCartByIdController,
    delProductFromCartByIdsController
} = require('../../controllers/carts.controller');

router.get('/', getCartsController);
router.get('/:id/products', getCartByIdController);
router.post('/', auth, newCartController);
router.post('/:id/products', auth, addNewProductToCartController);
router.delete('/:id', auth, deleteCartByIdController);
router.delete('/:id/products/:idProduct', auth, delProductFromCartByIdsController);


module.exports = router;