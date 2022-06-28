

import ProductsDao from "./ProductsDao.js";
import MongoClient from "../../../db/mongo/DBClientMongo.js";

class ProductsDaoDb extends ProductsDao {
    constructor(collection, schema) {
        super();
        this.client = new MongoClient();
        (async () => {
            this.connection = await this.client.connect();
            this.model = this.connection.model(collection, schema);
        })();
    }

    async getAll(filter = {}) {
        const documents = await this.model.find(filter, { __v: 0 }).lean();
        return documents;
    }
    async getById(id) {
        const document = await this.model.findOne({ _id: id }, { __v: 0 }).lean();
        return document;
    }
    async add(element) {
        const newDocument = await this.model.create(element);
        return newDocument;
    }
    async updateById(id, element) {
        const updatedDocument = await this.model.findOneAndUpdate(
            { _id: id },
            { ...element },
            { new: true, }
        );
        if (!updatedDocument) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return updatedDocument;
    }
    async deleteById(id) {
        const deletedDocument = await this.model.findOneAndDelete({ _id: id });
        if (!deletedDocument) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return deletedDocument;
    }
    async deleteMany(filter = {}) {
        const deletedDocuments = await this.model.deleteMany({ ...filter });
        if (!deletedDocuments.deletedCount) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return deletedDocuments;
    }
    exit() {
        this.client.disconnect();
    }
}
export default ProductsDaoDb;