import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error{};

export const handleError= (err: Error, req: Request, res: Response, next: NextFunction)=>{
    if(err instanceof ValidationError){
        res
            .status(404)
            .render('error',{
                message: err.message
            })
    }
    console.error(err)
}
