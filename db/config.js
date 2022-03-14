const path = require('path')
const config = {
    madiadb: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'coderdb'
        }
    },
    sqlite: {
        client: 'sqlite',
        connection: {
            filename: path.resolve(__dirname, './ecommerce.sqlite')
        }
    }

};

module.exports = { config }