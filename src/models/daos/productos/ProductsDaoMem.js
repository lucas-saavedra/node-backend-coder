

import ProductsDao from "./ProductsDao.js";

class ProductsDaoMem extends ProductsDao {
    constructor() {
        super();
        this.products = [];
    }
    async getAll() {
        return this.products;
    }
    async getById(id) {
        const document = this.products.find(product => product.id === id);
        return document;
    }
    async insert(element) {
        this.products.push(element);
        return true;
    }
    async updateById(id, element) {

    }
    async deleteById(id) {

    }
    exit() {

    }
}
export default ProductsDaoMem;