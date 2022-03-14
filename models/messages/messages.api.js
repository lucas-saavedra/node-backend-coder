const knex = require('knex');
class MessagesApi {
    constructor(config, tableName) {
        this.tableName = tableName;
        this.knex = knex(config);
    }
    async createTableIfNotExists() {
        this.knex.schema.hasTable(this.tableName).then((exists) => {
            if (!exists) {
                return this.knex.schema.createTable(this.tableName, (t) => {
                    t.increments('id').primary();
                    t.text('socketId', 256);
                    t.varchar('email', 256);
                    t.varchar('message', 256);
                    t.text('datetime');
                });
            }
        });
    }
    getAll = async () => {
        try {
            await this.createTableIfNotExists();
            const rows = await
                this.knex(this.tableName)
                    .select('*');
            const queryArray = Object.values(JSON.parse(JSON.stringify(rows)));
            return queryArray;
        } catch (error) {
            return error.message;
        }
    }
    addMessage = async (message) => {
        try {
            try {
                const rows = await
                    this.knex(this.tableName)
                        .insert({ ...message });
                const result = Object.values(JSON.parse(JSON.stringify(rows)));
                return result[0];
            } catch (error) {
                return error.message;
            }
        } catch (error) {
            return error.message;
        }
    }

}

module.exports = MessagesApi;

