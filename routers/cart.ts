import { Router } from "express";
import * as jwt from "jsonwebtoken";
import { BookRepository } from "../records/book.repository";
import { UserRepository } from "../records/UserRepository";
import { ValidationError } from "../utils/errors";
import { tokenEntity } from "./home";


export const cartRouter = Router();

cartRouter
  .get('/add/:id', async (req, res) => {
    // console.log(typeof req.params.id)

    let product = await BookRepository.findOneById(req.params.id);

    // console.log(typeof product.count)

    if (product.count > 0) {
      product.count--;
      await BookRepository.update(product);

      // @todo stworzyć db orders i powiazać z użytkownikiem


      res
        .render('cart/added', {
          title: product.title
        })
    }
    else {
      res
        .render('cart/solded', {
          title: product.title
        })
    }
  })

  .get('/resume', (req, res) => {
    res.send('podsumowanie')
  })

  .get('/wishlist', async (req, res) => {

    let jwtCookie: string | null = req.cookies.jwt;


    if (!jwtCookie) {
      res.render('wishlist/noAccess')
    }
    else {
      let verifyToken = jwt.verify(jwtCookie, process.env.ACCESS_TOKEN_KEY) as tokenEntity;
      const mail = verifyToken.mail;
      const username = await UserRepository.findOne(mail);

      if (mail && username) {

        // @todo stworzyć pole w users wishlist i powiazać z użytkownikiem

        res.send('wishlist')
      }
      else {
        throw new ValidationError('invalid login Details')
      }
    }



  })

