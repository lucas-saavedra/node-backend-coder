const MongoContainer = require("../../containers/MongoContainer.js");
const mongoose = require("mongoose");


const collection = 'messagess'
const messagessSchema = new mongoose.Schema({
    author: {
        id: String,
        nombre: String,
        edad: Number,
        alias: String,
        avatar: String,
        alias: String
    },
    text: String,
    datetime: String
})
class MessagessDaoMongoDb extends MongoContainer {
    constructor() {
        super(collection, messagessSchema);
    }
}
module.exports = MessagessDaoMongoDb;