import * as express from "express";
import "express-async-errors";
import { engine } from "express-handlebars";
import * as methodOverride from "method-override";
import './utils/db';





const app = express();

app.use(methodOverride('_method'))
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({
  extended: true
}));

app.engine('.hbs', engine({
  extname: '.hbs',
  // helpers: handlebarsHelpers
}));
app.set('view engine', '.hbs');

app.get('/', (req: express.Request, res: express.Response) => {
  res.render('index')
})


app.listen(3000, '127.0.0.1', () => {
  console.log('Listening : http://localhost:3000')
})

