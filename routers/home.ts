import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { UserRepository } from "../records/UserRepository";
import { ACCESS_TOKEN_KEY } from "../utils/secure";

export interface tokenEntity extends JwtPayload {
  mail: string;
}

export const homeRouter = Router();

homeRouter
  .get('/', async (req, res) => {

    let jwtCookie: string | undefined = req.cookies.jwt;

    if (!jwtCookie) {
      res.render('index', {
        isActiveToken: false
      })
    }
    else {
      let verifyToken = jwt.verify(jwtCookie, ACCESS_TOKEN_KEY) as tokenEntity;
      const mail = verifyToken.mail;

      // console.log(typeof mail)

      const rootUser = await UserRepository.findOne(mail);

      if (rootUser.sesToken) {
        res.render('index', {
          isActiveToken: true,
          mail: rootUser.mail
        })
      }
      else {
        res
          .clearCookie('jwt')
          .render('index', {
            isActiveToken: false
          })
      }



    }



    // console.log(jwtCookie)

  })
