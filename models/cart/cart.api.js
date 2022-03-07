class CartApi {
    constructor(array) {
        this.CartList = array;
    }
    getAll() {
        return [...this.CartList];
    }
    newCart() {
        const cart = { products: [], createdAt: Date.now() };
        if (!this.CartList.length) {
            cart.id = 1;
        } else {
            cart.id = this.CartList.at(-1).id + 1;
        }
        this.CartList.push(cart);
        return cart;
    }
    getCartById(id) {
        const cart = this.CartList.find(cart => cart.id === id);
        return cart.products;
    }
    addNewProductToCart(item, cartId, quantity = 1) {

        const cartIndex = this.CartList.findIndex(cart => cart.id === cartId);

        /* const isInCartIndex = itemId => {
            return cart.indexOf(cart.find(({ item: itemCart }) => itemCart.id === itemId))
        };

        if (isInCartIndex(item.id) !== -1) {
            temp[isInCartIndex(item.id)].quantity += quantity;
        }
        else {
            temp.push({ item, quantity });
        } */
        this.CartList[cartIndex].products.push(item)
        /*  if (!this.productList.length) {
             product.id = 1;
         } else {
             product.id = this.productList.at(-1).id + 1;
         }
         this.productList.push(product); */
        return this.CartList[cartIndex];
    }
    updateProduct(title, price, thumbnail, id) {
        const index = this.productList.findIndex((product) => product.id === id);
        if (index < 0) {
            return { success: false, status: 404, error: `El producto con el id: ${id} no existe` };
        } else {
            const newProduct = {
                ...this.productList[index],
                title,
                price,
                thumbnail
            }
            this.productList[index] = newProduct;
            return { success: true, result: newProduct };
        }
    }
    deleteProdById(id) {
        const index = this.productList.findIndex((product) => product.id === id);
        if (index < 0) {
            return { success: false, status: 404, error: `El producto con el id: ${id} no existe` };
        } else {
            this.productList = this.productList.filter((product) => product.id !== id);
            return {
                success: true, result: `El producto con el id: ${id} fue eliminado correctamente`
            };
        }
    }
};

module.exports = CartApi;