import mongoose from 'mongoose';
// import slug from 'mongoose-slug-generator';
const { Schema } = mongoose;

// const options = {
//   separator: '-',
//   lang: 'en',
//   truncate: 120,
// };

// mongoose.plugin(options);

// Product Schema
const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  sku: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  // slug: {
  //   type: String,
  //   slug: 'name',
  //   unique: true,
  // },
  imageUrl: {
    type: String,
    default: null,
  },
  details: {
    type: Object,
  },
  imageKey: {
    type: String,
  },
  description: {
    type: String,
    // required: true,
    default: '',
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  taxable: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: 'Brand',
    default: null,
  },
  // category: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   required: true,
  //   default: null,
  // },
  category: {
    type: String,
    required: true,
    trim: true,
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', ProductSchema);
