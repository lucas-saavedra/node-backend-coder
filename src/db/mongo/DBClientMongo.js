import mongoose from "mongoose";
import CustomError from "../../utils/errors/customError.js";
import connectToMongoDb from "../config.js";
import DbClient from "../DBClient.js"
let instance = null;
class MongoClient extends DbClient {
    constructor() {
        super();
        this.connected = false;
        this.client = mongoose;
    }
    async connect() {
        try {
            instance = await this.client.connect(connectToMongoDb('users'));
            this.connected = true;
            //console.log('Base de datos connectada, instancia: ', instance.connection.id);
            return instance;
        } catch (error) {
            console.log(error);
        }
    }
    async disconnect() {
        try {
            await this.client.connection.close()
            console.log('base de datos desconectada')
            this.connected = false
        } catch (error) {
            throw new CustomError(500, 'error al desconectarse de mongodb', error)
        }
    }
}

export default MongoClient;