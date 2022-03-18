require('dotenv').config();
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import 'dotenv/config';
import * as express from "express";
import "express-async-errors";
import { engine } from "express-handlebars";
import * as methodOverride from "method-override";
import { cartRouter } from './routers/cart';
import { homeRouter } from "./routers/home";
import { loginRouter } from "./routers/login";
import { newsletterRouter } from "./routers/newsletter";
import { wishlistRouter } from './routers/wishlist';
import './utils/db';
import { handleError } from './utils/errors';


const { PORT = 3000 } = process.env;
const app = express();

const allowlist = ['http://localhost:3000', 'http://localhost:3099']
const corsOptionsDelegate: cors.CorsOptionsDelegate<any> = (req, callback) => {
  const corsOptions = (allowlist.indexOf(req.header('Origin')) !== -1) ? { origin: true } : { origin: false };
  callback(null, corsOptions);
};

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())
app.use(cors(corsOptionsDelegate));

app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers: handlebarsHelpers
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/newsletter', newsletterRouter);
app.use('/login', loginRouter);
app.use('/cart', cartRouter);
app.use('/wishlist', wishlistRouter)

app.use(handleError);


// app.listen(3000, '127.0.0.1', () => {
//   console.log('Listening : http://localhost:3000')
// })

app.listen(PORT, () => {
  console.log('server started at http://localhost:' + PORT);
});

