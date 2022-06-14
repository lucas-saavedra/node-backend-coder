import mongoose from "mongoose";
import config from "../config";
import DbClient from "../DBClient";
let instance = null;
class MongoClient extends DbClient {
    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
    }
    async connect() {
        try {
            if (!this.connected) {
                instance = await this.client.connect(config.mongodb.uri);
                console.log('base de datos conectada');
                this.connected = true;
            } else {

            }

        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mongodb 1', error)
        }
    }
    async disconnect() {
        try {
            await this.client.connection.close()
            console.log('base de datos desconectada')
            this.connected = false
        } catch (error) {
            throw new CustomError(500, 'error al conectarse a mongodb 2', error)
        }
    }
}