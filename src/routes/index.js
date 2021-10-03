import express from 'express';
import { productRoutes } from './products.js';

export const router = express.Router();

router.use('/products', productRoutes);
