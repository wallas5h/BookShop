import { Router } from "express";
import { NewsletterRecord } from "../records/NewsletterRecord";

export const newsletterRouter = Router();

newsletterRouter
  .post('/', async (req, res) => {

    const mail = String(req.body.mail);

    if (await NewsletterRecord.findOne(mail)) {

      res.render('newsletter/exist', {
        mail
      })

    } else {
      await NewsletterRecord.insertOne(mail);

      res.render('newsletter/added', {
        mail
      })

    }
  })