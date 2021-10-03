import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 200,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 200,
  },
});

export default mongoose.model('product', productSchema);
