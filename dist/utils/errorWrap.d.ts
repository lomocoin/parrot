/// <reference types="express" />
import { Response, Request, NextFunction, RequestHandler } from "express";
declare const _default: (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => RequestHandler;
export default _default;
