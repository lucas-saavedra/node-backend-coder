import ProductoDTO from "../models/dtos/ProductoDto.js";
import getDao from "../models/daos/productos/ProductsDaoFactory.js";

class Cotizador {
    constructor() {
        this.dolarBlueValue = 229.30;
        this.dolarOficialValue = 127.96;
    }

    getPrecioSegunMoneda(precio, moneda) {
        switch (moneda) {
            case 'USD_BLUE':
                return precio * +this.dolarBlueValue;
            case 'USD_OFICIAL':
                return precio * +this.dolarOficialValue;
            default:
                return precio;
        }
    }
}
class ProductsRepo {
    constructor() {
        this.productsDao = getDao();
        this.cotizador = new Cotizador();
    }
    async getAllRepo() {
        const products = await this.productsDao.getAll();
        return products;
    }
    async getByIdRepo(id) {
        const product = await this.productsDao.getById(id);
        return product;
    }
    async insertRepo(element) {
        const newProduct = await this.productsDao.add(element);
        return newProduct;
    }
    async updateByIdRepo(id, updatedElement) {
        const updatedProduct = await this.productsDao.updateById(id, updatedElement);
        return updatedProduct;
    }
    async deleteByIdRepo(id) {
        const deletedProducts = await this.productsDao.deleteById(id);
        return deletedProducts;
    }
    async deleteManyRepo(filter) {
        const deletedProducts = await this.productsDao.deleteMany(filter);
        return deletedProducts;
    }


    async getByIdWithQuotation(id) {
        const product = await this.productsDao.getById(id);
        const cotizaciones = {
            precioDolarBlue: await this.cotizador.getPrecioSegunMoneda(product.precio, "USD_BLUE"),
            precioDolarOficial: await this.cotizador.getPrecioSegunMoneda(product.precio, "USD_OFICIAL"),
        }
        const productoDTO = new ProductoDTO(product, cotizaciones);
        return productoDTO;
    }
    async getAllWithQuotation() {
        const products = await this.productsDao.getAll();
        const productsDtos = products.map(product => {
            const cotizaciones = {
                precioDolarBlue: this.cotizador.getPrecioSegunMoneda(product.precio, "USD_BLUE"),
                precioDolarOficial: this.cotizador.getPrecioSegunMoneda(product.precio, "USD_OFICIAL"),
            }
            const productoDTO = new ProductoDTO(product, cotizaciones);
            return productoDTO
        })
        return productsDtos;
    }
}
export default ProductsRepo;