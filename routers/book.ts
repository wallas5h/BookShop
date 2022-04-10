import { Router } from "express";
import { BookRepository } from "../records/book.repository";


export const bookRouter = Router();

bookRouter
  .get('/:id', async (req, res) => {

    let book = await BookRepository.findOneById(req.params.id);

    console.log(book)

    res
      .render('book/one', {
        book
      })

  })