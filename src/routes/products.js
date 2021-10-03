import express from 'express';
import {
  createProduct,
  getProducts,
  getProductById,
} from '../controllers/products.js';

export const productRoutes = express.Router();

productRoutes.post('/', createProduct);
productRoutes.get('/', getProducts);
productRoutes.get('/:_id', getProductById);
