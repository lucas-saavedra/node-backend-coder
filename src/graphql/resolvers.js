import ProductsApi from "../api/products.api.js";

const api = new ProductsApi();
const resolvers = {

    getProducts: async () => {
        const products = await api.getAllApi();
        return Object.values(products);
    },
    getProduct: async ({ _id }) => {
        const product = await api.getByIdApi(_id);
        return product;
    },
    createProduct: async ({ data }) => {
        const productAdded = await api.addApi(data);
        return productAdded;
    },
    updateProduct: async ({ id, data }) => {
        const updatedProduct = await api.updateByIdApi(id, data);
        return updatedProduct;
    },
    deleteProduct: async ({ id }) => {
        const deletedProduct = await api.deleteByIdApi(id);
        return deletedProduct;
    }

}
export default resolvers;