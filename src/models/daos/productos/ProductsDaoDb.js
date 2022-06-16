

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
        if (!document) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return document;
    }
    async insert(element) {
        const newDocument = await this.model.create(element);
        return newDocument;
    }
    async updateById(id, element) {
        const updatedDocument = await this.model.updateOne({ _id: id }, {
            $set: { ...element }
        });
        if (!updatedDocument.matchedCount) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return updatedDocument;
    }
    async deleteById(id) {
        const deletedDocument = await this.model.deleteOne({ _id: id });
        if (!deletedDocument.deletedCount) {
            throw new Error('[NOT_FOUND] => The requested resource does not exist!');
        }
        return deletedDocument;
    }
    exit() {
        this.client.disconnect();
    }
}
export default ProductsDaoDb;