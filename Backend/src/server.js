import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser'; // allow you to parse the cookie values
import cors from 'cors';
import authRoute from './Routes/authRoutes.js';
import productRoute from './Routes/productRoutes.js'
import cartRoute from './Routes/cartRoutes.js';
import orderRoute from './Routes/orderRoutes.js';
import methodOverride from 'method-override'
import path from 'path'
dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(methodOverride('_method'))
app.set('view engine','hbs')
app.use(express.static(path.resolve('public')));
app.use(cors({
  origin: "http://127.0.0.1:5500",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());

app.use('/auth',authRoute);
app.use('/product',productRoute)
app.use('/cart',cartRoute)
app.use('/order',orderRoute)


app.listen(PORT,()=>{
  console.log(`Listening to port ${PORT}`);
  connectDB();
});