import { Response, Request, NextFunction, RequestHandler } from "express";

export default (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>): RequestHandler => (req: Request, res: Response, next: NextFunction) => fn(req, res, next).catch(next)
