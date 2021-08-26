import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });
import path from 'path';
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
import uploadsRoute from './routes/uploads.js';

// connect to db
connectDb();

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// routes
app.use('/api/auth', authRoute);
app.use('/api/products', productsRoute);
app.use('/api/order', orderRoute);
app.use('/api/upload', uploadsRoute);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

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
