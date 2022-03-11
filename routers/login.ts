import { Router } from "express";
import { ObjectId } from "mongodb";
import { UserRecord } from "../records/User.record";
import { UserRepository } from "../records/UserRepository";
import { compareText, encryptText } from "../utils/secure";


export const loginRouter = Router();

loginRouter
  .post('/', async (req, res) => {

    try {
      const mail = String(req.body.mail);
      const password = String(req.body.password);
      const checked: string | undefined = req.body.checked;

      // console.log(typeof checked)

      const username = await UserRepository.findOne(mail);

      if (await compareText(password, username.password)) {
        res
          .status(200)
          // .render('login/login')
          .render('index', {
            isLoged: true,
          })
      }
      else {
        res.status(400).send("invalid login Details");
      }

    } catch (error) {
      res.status(400).send("invalid login Details");
    }

    // res.render('login/login');

  })
  .get('/remind', (req, res) => {

    res.render('login/remind')
  })
  .post('/remind/sent', (req, res) => {

    res.render('login/sentRemind', {
      mail: req.body.mail
    })
  })
  .get('/register', (req, res) => {
    res.render('login/register')
  })
  .post('/register/new', async (req, res) => {

    if (await UserRepository.findOne(String(req.body.mail))) {
      res.render('login/alreadyExist')
    }
    else {
      const { mail, password, phone } = req.body

      const passwordHash = await encryptText(req.body.password);

      const newUser = new UserRecord({
        _id: new ObjectId(),
        mail,
        password: passwordHash,
        phone
      });

      await UserRepository.createUser(newUser)

      res.render('login/registerComplited')
    }


  })

