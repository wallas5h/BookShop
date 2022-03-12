import * as cookieParser from 'cookie-parser';
import * as express from "express";
import "express-async-errors";
import { engine } from "express-handlebars";
import * as methodOverride from "method-override";
import { homeRouter } from "./routers/home";
import { loginRouter } from "./routers/login";
import { newsletterRouter } from "./routers/newsletter";
import './utils/db';





const app = express();

// app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));
app.use(cookieParser())

app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers: handlebarsHelpers
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/newsletter', newsletterRouter);
app.use('/login', loginRouter);


app.listen(3000, '127.0.0.1', () => {
  console.log('Listening : http://localhost:3000')
})

