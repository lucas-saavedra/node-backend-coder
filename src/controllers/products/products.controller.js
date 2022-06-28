import ProductsApi from "../../api/products.api.js";

class ProductController {
    constructor() {
        this.productApi = new ProductsApi()
    }
    getProductsController = async (req, res, next) => {
        try {
            let result;
            if (req.params.id) {
                const id = req.params.id;
                result = await this.productApi.getById(id);
                res.json({ success: true, result })
            } else {
                result = await this.productApi.getAllApi();
                res.json({ success: true, result })
            }
        } catch (error) {
            next(error);
        }
    }
    addProductController = async (req, res, next) => {
        try {
            const result = await this.productApi.addApi({ ...req.body });
            res.json({ success: true, result })
        } catch (error) {
            next(error)
        }
    }
    updProductController = async (req, res, next) => {
        try {
            const id = req.params.id;
            const result = await this.productApi.updateByIdApi(id, { ...req.body });
            return res.json({ success: true, result });
        } catch (error) {
            next(error);
        }

    }
    deleteProductController = async (req, res, next) => {
        try {
            const id = req.params.id;
            const deletedProd = await this.productApi.deleteByIdApi(id);
            return res.json({ success: true, result: deletedProd });
        } catch (error) {
            next(error);
        }
    }
    deleteManyController = async (req, res, next) => {
        try {
            const id = req.params.id;
            await this.productApi.deleteManyApi(filter);
            return res.json({ success: true, result: 'Document successefully deleted' });
        } catch (error) {
            next(error);
        }
    }
}
export default ProductController;