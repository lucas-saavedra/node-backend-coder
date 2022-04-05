const MongoContainer = require("../../containers/MongoContainer.js");
const mongoose = require("mongoose");


const collection = 'messagess'
const messagessSchema = new mongoose.Schema({
    author: {
        nombre: String,
        edad: Number,
        alias: String,
        avatar: String
    },
    text: String
})
class MessagessDaoMongoDb extends MongoContainer {
    constructor() {
        super(collection, messagessSchema);
    }
}
module.exports = MessagessDaoMongoDb;