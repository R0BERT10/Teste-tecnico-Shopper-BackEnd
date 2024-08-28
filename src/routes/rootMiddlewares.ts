import { NextFunction, Request, Response } from "express";

export const handleServerErrors = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log("onHandleServerErrors middleware")
    if (err) {
        if (err instanceof SyntaxError) {
            console.log(err.message)
            if (/JSON/i.test(err.message)) {
                return res.status(400).json("Bad JSON format")
            } else {
                return res.status(500).json(err.message)
            }
        } else {
            console.log(`Name ${err.name}, 
                    Message:${err.message}`)
            console.log(`Error Stack \n ${err.stack}`)
            return res.status(500).json('Unexpected server error.')
        }
    }
    return next()
}