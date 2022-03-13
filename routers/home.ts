import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { BookRepository } from "../records/book.repository";
import { UserRepository } from "../records/UserRepository";

export interface tokenEntity extends JwtPayload {
  mail: string;
}

export const homeRouter = Router();

homeRouter
  .get('/', async (req, res) => {

    let featuredBooks = await BookRepository.findAll();
    let arrivalsBooks = (await BookRepository.findAll()).reverse()

    let jwtCookie: string | undefined = req.cookies.jwt;

    if (!jwtCookie) {
      res.render('index', {
        isActiveToken: false,
        featuredBooks,
        arrivalsBooks
      })
    }
    else {
      let verifyToken = jwt.verify(jwtCookie, process.env.ACCESS_TOKEN_KEY) as tokenEntity;
      const mail = verifyToken.mail;

      // console.log(typeof mail)

      const rootUser = await UserRepository.findOne(mail);

      if (rootUser.sesToken) {
        res.render('index', {
          isActiveToken: true,
          mail: rootUser.mail,
          featuredBooks,
          arrivalsBooks
        })
      }
      else {
        res
          .clearCookie('jwt')
          .render('index', {
            isActiveToken: false,
            featuredBooks,
            arrivalsBooks
          })
      }



    }



    // console.log(jwtCookie)

  })
