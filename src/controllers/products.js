import Product from '../models/product.js';

export const createProduct = async (req, res, next) => {
  try {
    const { body } = req;
    const product = await Product.create(body);
    res.send({ product });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.send({ products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const product = await Product.findById(_id);
    res.send({ product });
  } catch (error) {
    next(error);
  }
};
