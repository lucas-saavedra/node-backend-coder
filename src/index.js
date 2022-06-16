import express from 'express';
import mongoose from 'mongoose';
import config from '../config.js';
import ProductsApi from './api/products.api.js';
import ProductsRepo from './repositories/Products.repo.js';


const PORT = config.PORT || 8080;
const app = express();


app.get('/api/products/:id?', async (req, res) => {
  const productsRepo = new ProductsRepo();
  let result = {};
  try {
    if (req.params.id) {
      result = await productsRepo.getByIdWithQuotation(req.params.id);
    } else {
      result = await productsRepo.getAllWithQuotation();
    }
    res.json(result);
  } catch (error) {
    res.json(error);
  }

})

app.listen(PORT, () => {
  console.log('Server running on', PORT);
})

