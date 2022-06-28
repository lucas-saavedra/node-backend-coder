import ProductsRepo from "../repositories/Products.repo.js";

class ProductsApi {
    constructor() {
        this.productsRepo = new ProductsRepo();
    }
    async getAllApi() {
        const products = await this.productsRepo.getAllRepo();
        return products;
    }
    async getByIdApi(id) {
        const product = this.productsRepo.getByIdRepo(id);
        return product;
    }
    async addApi(element) {
        const product = this.productsRepo.insertRepo(element);
        return product;
    }
    async updateByIdApi(id, element) {
        const updatedProduct = await this.productsRepo.updateByIdRepo(id, element);
        return updatedProduct;
    }
    async deleteByIdApi(id) {
        const deleted = this.productsRepo.deleteByIdRepo(id);
        return deleted;
    }
    async deleteManyApi(filter) {
        const deleted = this.productsRepo.deleteManyRepo(filter);
        return deleted;
    }
    async getAllWithQuotationApi() {
        const products = await this.productsRepo.getAllWithQuotation();
        return products;
    }
    async getByIdWithQuotationApi(id) {
        const products = await this.productsRepo.getByIdWithQuotation(id);
        return products;
    }

}
export default ProductsApi;