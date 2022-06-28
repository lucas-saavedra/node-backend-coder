import request from "supertest";
import app from "../src/index.js";
import MongoClient from "../src/db/mongo/DBClientMongo.js";
import getDao from "../src/models/daos/productos/ProductsDaoFactory.js";

describe('Pruebas sobre la API de productos', () => {
    const db = new MongoClient();
    const productDao = getDao();
    const newProduct = {
        titulo: "Product name test",
        descripcion: "description test",
        codigo: "testCode0010",
        url: "test_url",
        stock: 99,
        precio: 2000
    }
    beforeAll(async () => {
        await db.connect()
    });

    afterAll(async () => {
        await db.disconnect();
    });

    describe('Peticiones a  api/productos', () => {
        describe('GET /api/productos', () => {
            let response;
            beforeEach(async () => {
                const req = request(app);
                response = await req.get('/api/productos').send();
            })

            it('La ruta funciona', async () => {
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('json');
            });

            it('La petición nos devuelve un objeto', async () => {
                expect(response.body).toBeInstanceOf(Object);
            });

        });
        describe('POST /api/productos', () => {
            let response;

            const wrongProduct = { titulo: 'test product' };

            afterAll(async () => {
                await productDao.deleteMany({ titulo: "Product name test" });
            });

            it('La ruta funciona', async () => {
                response = await request(app).post('/api/productos').send(newProduct);
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('json');
            });

            it('Se inserta correctamente', async () => {
                expect(response.body.result._id).toBeDefined();
                expect(response.body.result.titulo).toBe(newProduct.titulo);
            });
            it('Error en la inserción', async () => {
                const response = await request(app).post('/api/productos').send(wrongProduct);
                expect(response.status).toBe(400);
                expect(response.body.error).toBeDefined();
            });
        });
        describe('PUT /api/productos', () => {

            let producto;
            beforeEach(async () => {
                producto = await productDao.add(newProduct);
            });

            afterEach(async () => {
                await productDao.deleteById(producto._id);
            });

            it('La ruta funciona', async () => {
                const response = await request(app).put(`/api/productos/${producto._id}`).send({
                    titulo: 'product updated'
                });
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('json');
            });
            it('Se actualiza correctamente', async () => {
                const response = await request(app)
                    .put(`/api/productos/${producto._id}`)
                    .send({
                        titulo: 'product updated'
                    })

                expect(response.body.result._id).toBeDefined();
                expect(response.body.result.titulo).toBe('product updated');

            })
        });

        describe('DELETE /api/productos', () => {

            let producto;
            let response;
            beforeEach(async () => {
                producto = await productDao.add(newProduct);
                response = await request(app).delete(`/api/productos/${producto._id}`).send();
            });

            it('La ruta funciona', () => {
                expect(response.status).toBe(200);
                expect(response.headers['content-type']).toContain('json');
            });

            it('Borra correctamente', async () => {
                expect(response.body.result._id).toBeDefined();
                const productFound = await productDao.getById(productDao._id);
                expect(productFound).toBeNull();
            })

        })
    })

})