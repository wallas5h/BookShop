import { Router } from "express";
import { BookRecord } from "../records/book.record";
import { BookRepository } from "../records/book.repository";
import { UserRepository } from "../records/UserRepository";
import { recognizeUserbyJWT } from "../utils/secure";


export const cartRouter = Router();

cartRouter
  .get('/add/:id', async (req, res) => {

    let product = await BookRepository.findOneById(req.params.id);

    if (product.count > 0) {

      // @todo stworzyć db orders i powiazać z użytkownikiem- po kliknięciu kup w shopping card

      if (!req.cookies.jwt) {
        res
          .render('cart/loginRequest')
      }
      else {

        product.count--;
        await BookRepository.update(product);

        const rootUser = await recognizeUserbyJWT(req.cookies.jwt);



        let userShoppingCard: BookRecord[] = rootUser.shoppingCard;
        userShoppingCard.push(product);

        await UserRepository.updateUser(rootUser);

        await UserRepository.deleteProductFromWishList(rootUser, product);

        res
          .render('cart/added', {
            title: product.title
          })
      }

    }
    else {
      res
        .render('cart/solded', {
          title: product.title
        })
    }
  })

  .get('/resume', async (req, res) => {

    if (!req.cookies.jwt) {
      res
        .render('cart/loginRequest')
    }
    else {

      const rootUser = await recognizeUserbyJWT(req.cookies.jwt);
      const shoppingCard = rootUser.shoppingCard;
      const countSumShoppingCard = await UserRepository.sumCountShoppingCard(rootUser)


      res
        .render('cart/resume', {
          shoppingCard,
          sum: countSumShoppingCard
        })

    }
  })
  .get('/remove/:id', async (req, res) => {

    let product = await BookRepository.findOneById(req.params.id);
    product.count++;


    await BookRepository.update(product);

    const rootUser = await recognizeUserbyJWT(req.cookies.jwt);

    await UserRepository.deleteProductFromShoppingCard(rootUser, product)

    res
      .redirect('/cart/resume')
  })




