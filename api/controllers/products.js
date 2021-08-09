import Product from '../models/Product.js';
import data from '../Products.js';
import User from '../models/User.js';
// get product
export const getProduct = async (req, res) => {
  try {
    console.log('hellooooo');
    const product = await Product.findOne({ productId: req.params.productId });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
// get products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

//create user

export const createProduct = async (req, res) => {
  try {
    // res.status(200).json(rv);
  } catch (error) {
    console.log(error);
  }
};

//update user

export const updateProduct = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Account has been updated');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account!');
  }
};

// delete user
export const deleteProduct = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json('Account has been deleted');
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can delete only your account!');
  }
};
