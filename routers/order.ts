import { Request, Response, Router } from "express";


export const orderRouter = Router()

orderRouter
  .get('/', (req: Request, res: Response) => {

    res.render('under-construction')
  })