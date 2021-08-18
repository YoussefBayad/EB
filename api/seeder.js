import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import User from './models/User.js';
import Product from './models/Product.js';
import connectDb from './config/db.js';
import products from './Products.js';
connectDb();

const importData = async () => {
  try {
    // User.deleteMany()
    await Product.deleteMany();
    const admin = await User.findOne({ username: 'admin' });
    const newProducts = products.map((product) => {
      const { name, price, category, imageURL, ...others } = product;

      return {
        user: admin._id,
        name,
        price,
        imageURL,
        category,
        countInStock: 3,
        details: others,
      };
    });

    const done = await Product.insertMany(newProducts);
    console.log(done);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
