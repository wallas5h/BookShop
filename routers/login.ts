import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { UserRecord } from "../records/User.record";
import { UserRepository } from "../records/UserRepository";
import { ACCESS_TOKEN_KEY, compareText, createRefreshToken, createSesionToken, encryptText } from "../utils/secure";
import { tokenEntity } from "./home";


export const loginRouter = Router();

loginRouter

  .post('/', async (req, res) => {

    try {
      const mail = String(req.body.mail);
      const password = String(req.body.password);
      const checked: string | undefined = req.body.checked;


      const username = await UserRepository.findOne(mail);

      if (await compareText(password, username.password)) {

        let cookieToken = await createSesionToken({ mail });

        await UserRepository.updateSesionToken(mail, cookieToken);

        // console.log(cookieToken)

        res
          .status(200)
          .cookie('jwt', cookieToken, {
            expires: new Date(Date.now() + 1000 * 60 * 30),
            httpOnly: true,
            secure: true,
          })
          .redirect('/');
        // .render('login/login')

      }
      else {
        res.status(400).send("invalid password Details");
      }

    } catch (error) {
      res.status(400).send("invalid login Details");
    }

  })

  .post('/logout', async (req, res) => {

    let jwtCookie: string | undefined = req.cookies.jwt;
    let verifyToken = jwt.verify(jwtCookie, ACCESS_TOKEN_KEY) as tokenEntity;
    const mail = verifyToken.mail;

    await UserRepository.deleteSesionToken(mail)

    res
      .clearCookie('jwt')
      .redirect('/')
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

      const refToken = await createRefreshToken({
        mail,
        password: passwordHash,
      })

      const newUser = new UserRecord({
        _id: new ObjectId(),
        mail,
        password: passwordHash,
        phone,
        refToken,
        sesToken: null
      });

      await UserRepository.createUser(newUser)

      res
        .render('login/registerComplited')
      // .json(refToken)
    }


  })

