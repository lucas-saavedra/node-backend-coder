const fs = require('fs');
class Contenedor {
    constructor(fileName) {
        this.fileName = `./${fileName}`;
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
    save = async (product) => {
        try {
            let productList = await this.createIfNotExists();
            let productListParsed = JSON.parse(productList);
            if (!productListParsed.length) {
                product.id = 1;
            } else {
                product.id = productListParsed.at(-1).id + 1;
            }
            productListParsed.push(product);
            await fs.promises.writeFile(this.fileName, JSON.stringify(productListParsed));
            return product.id;
        } catch (error) {
            return error.message;
        }
    }

    getById = async (id) => {
        try {
            let productList = await this.createIfNotExists();
            productList = JSON.parse(productList);
            const findProduct = productList.find(e => e.id === id);
            return findProduct ? findProduct : null;
        } catch (error) {
            return error.message;
        }
    }
    getAll = async () => {
        try {
            const productList = await this.createIfNotExists();
            return JSON.parse(productList);
        } catch (error) {
            return error.message;
        }
    }
    deleteById = async (id) => {
        try {
            let productList = await this.createIfNotExists();
            productList = JSON.parse(productList);
            if (productList.length !== 0) {
                if (productList.find(e => e.id === id)) {
                    const newProductList = productList.filter(e => e.id !== id);
                    await fs.promises.writeFile(this.fileName, JSON.stringify(newProductList));
                    return 'Objeto eliminado';
                } else {
                    throw new Error('No existe el ID ingresado');
                }
            } else {
                throw new Error('Archivo vacío');
            }
        } catch (error) {
            return error.message;
        }
    }
    deleteAll = async () => {
        try {
            await fs.promises.writeFile(this.fileName, '[]');
        } catch (error) {
            return error.message;
        }
    }
    productoRandom = async () => {
        try {
            let productList = await this.createIfNotExists();
            productList = JSON.parse(productList);
            return productList[Math.floor(Math.random() * (productList.length))];
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = { Contenedor }

