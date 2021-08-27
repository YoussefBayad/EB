import mongoose from 'mongoose';
// import slug from 'mongoose-slug-generator';
const { Schema } = mongoose;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// product  schema
const ProductSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  reviews: [reviewSchema],
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
  imageUrl: {
    type: String,
    default: '/uploads\\default.webp',
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
    default: 'other',
    trim: true,
  },

  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Product', ProductSchema);
