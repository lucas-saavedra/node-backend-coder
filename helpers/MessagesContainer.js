const fs = require('fs');
class MessagesContainer {
    constructor(fileName) {
        this.fileName = `public/${fileName}`;
    }
    createIfNotExists = async () => {
        let notExists = false;
        try {
            return await fs.promises.readFile(this.fileName, 'utf-8');
        } catch (error) {
            if (error.code === 'ENOENT') {
                notExists = true;
            } else {
                return error.message;
            }
        }
        if (notExists) {
            try {
                await fs.promises.writeFile(this.fileName, '[]');
                const file = await fs.promises.readFile(this.fileName, 'utf-8');
                return file;
            } catch (error) {
                return error.message;
            }
        }
    }
    save = async (message) => {
        try {
            let messageList = await this.createIfNotExists();
            let messageListParsed = JSON.parse(messageList);
            if (!messageListParsed.length) {
                message.id = 1;
            } else {
                message.id = messageListParsed.at(-1).id + 1;
            }
            messageListParsed.push(message);
            await fs.promises.writeFile(this.fileName, JSON.stringify(messageListParsed));
            return message.id;
        } catch (error) {
            return error.message;
        }
    }


    getAll = async () => {
        try {
            const messageList = await this.createIfNotExists();
            return JSON.parse(messageList);
        } catch (error) {
            return error.message;
        }
    }
   
}

module.exports = { MessagesContainer }

