import { Schema } from 'mongoose';
import * as mongoose from 'mongoose';

const ProductsSchema: Schema = new Schema({
  id: { type: Number, required: true },
  quantity: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
  brand: { type: String, required: true },
  productcollection: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  sale: { type: Boolean, required: true },
  discount: { type: Number, required: true },
  stock: { type: Number, required: true },
  new: { type: Boolean, required: true },
  tags: { type: String, required: true },
  variants: { type: String, required: true },
  images: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Product', ProductsSchema);
