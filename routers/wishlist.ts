import { Router } from "express";
import { BookRepository } from "../records/book.repository";
import { UserRepository } from "../records/UserRepository";
import { recognizeUserbyJWT } from "../utils/secure";

export const wishlistRouter = Router();

wishlistRouter

  .get('/', async (req, res) => {

    let jwtCookie: string | null = req.cookies.jwt;

    if (!jwtCookie) {
      res.render('wishlist/noAccess')
    }
    else {
      const rootUser = await recognizeUserbyJWT(req.cookies.jwt);
      let wishlist = rootUser.wishList

      res.render('wishlist/wishlist', {
        wishlist
      })

    }
  })

  .get('/add/:id', async (req, res) => {

    let jwtCookie: string | null = req.cookies.jwt;

    if (!jwtCookie) {
      res.render('wishlist/noAccess')
    } else {

      let product = await BookRepository.findOneById(req.params.id)
      const rootUser = await recognizeUserbyJWT(req.cookies.jwt);

      rootUser.wishList.push(product);

      await UserRepository.updateUser(rootUser);

      res.redirect('/')
    }

  })

  .get('/remove/:id', async (req, res) => {

    let product = await BookRepository.findOneById(req.params.id);
    const rootUser = await recognizeUserbyJWT(req.cookies.jwt);

    await UserRepository.deleteProductFromWishList(rootUser, product)

    res.redirect('/wishlist')

  })