require('dotenv').config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from "express";
import "express-async-errors";
import { engine } from "express-handlebars";
import rateLimit from 'express-rate-limit';
import methodOverride from "method-override";
import { config } from './config/config';
import { bookRouter } from './routers/book';
import { cartRouter } from './routers/cart';
import { homeRouter } from "./routers/home";
import { loginRouter } from "./routers/login";
import { newsletterRouter } from "./routers/newsletter";
import { orderRouter } from './routers/order';
import { wishlistRouter } from './routers/wishlist';
import './utils/db';
import { handleError } from './utils/errors';

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100
})
const { PORT } = process.env;

const app = express();


app.use(cors({
  origin: config.corsOrigin
}))

app.use(limiter);

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers: handlebarsHelpers
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/newsletter', newsletterRouter);
app.use('/login', loginRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter);
app.use('/order', orderRouter);
app.use('/book', bookRouter);

app.use(handleError);


app.listen(3000, '0.0.0.0', () => {
  console.log('server started at http://localhost:' + PORT);
});

