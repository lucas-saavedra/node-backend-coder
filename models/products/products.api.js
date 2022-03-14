const knex = require('knex');
class ProductsApi {
    constructor(config, tableName) {
        this.tableName = tableName;
        this.knex = knex(config);
    }
    async createTableIfNotExists() {
        this.knex.schema.hasTable(this.tableName).then((exists) => {
            if (!exists) {
                return this.knex.schema.createTable(this.tableName, (t) => {
                    t.increments('id').primary();
                    t.string('title', 256);
                    t.float('price');
                    t.text('thumbnail');
                });
            }
        });
    }
    async getAll() {
        try {
            await this.createTableIfNotExists()
            const rows = await
                this.knex(this.tableName)
                    .select('*');
            const queryArray = Object.values(JSON.parse(JSON.stringify(rows)));
            return queryArray;
        } catch (error) {
            return error.message;
        }
    }
    async addProduct(product) {
        try {
            const rows = await
                this.knex(this.tableName)
                    .insert({ ...product });
            const result = Object.values(JSON.parse(JSON.stringify(rows)));
            return result[0];
        } catch (error) {
            return error.message;
        }
    }
};

module.exports = ProductsApi;