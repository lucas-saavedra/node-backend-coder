import ProductsRepo from "../repositories/Products.repo.js";

class ProductsApi {
    constructor() {
        this.productsRepo = new ProductsRepo();
    }
    async getAllApi() {
        const products = await this.productsRepo.getAllRepo();
        return products;
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