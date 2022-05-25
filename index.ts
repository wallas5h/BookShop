require('dotenv').config();
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import express from "express";
import "express-async-errors";
import { engine } from "express-handlebars";
import methodOverride from "method-override";
import { bookRouter } from './routers/book';
import { cartRouter } from './routers/cart';
import { homeRouter } from "./routers/home";
import { loginRouter } from "./routers/login";
import { newsletterRouter } from "./routers/newsletter";
import { orderRouter } from './routers/order';
import { wishlistRouter } from './routers/wishlist';
import './utils/db';
import { handleError } from './utils/errors';


const { PORT = 3000 } = process.env;
const app = express();


// app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())
app.use(cors({
  origin: 'http://localhost:3000'
}))

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


app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});

