import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import express from 'express';
const app = express();
import helmet from 'helmet';
import morgan from 'morgan';
import multer from 'multer';
import connectDb from './config/db.js';

// middleware
import errorHandler from './middleware/error.js';

// routes
import productsRoute from './routes/products.js';
import authRoute from './routes/auth.js';
import orderRoute from './routes/order.js';

// connect to db
connectDb();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// routes
app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/order', orderRoute);

// Error Handler Middleware
app.use(errorHandler);

// starting server
const PORT = process.env.PORT || 5000;

app.listen(5000, () => {
  console.log(`Sever running on port ${PORT}`);
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  process.exit(1);
});

// app.use("/images", express.static(path.join(__dirname, "public/images")));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });
