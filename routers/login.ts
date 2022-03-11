import { Router } from "express";
import { UserRecord } from "../records/User.record";
import { UserRepository } from "../records/UserRepository";


export const loginRouter = Router();

loginRouter
  .post('/', (req, res) => {

    res.render('login/login');

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

    if (await UserRepository.findOne(new UserRecord(req.body))) {
      res.render('login/alreadyExist')
    }
    else {
      await UserRepository.createUser(new UserRecord(req.body))

      res.render('login/registerComplited')
    }


  })

