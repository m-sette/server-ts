/**
 * This file can be deleted. 
 * Left here only for reference
 */

import { Router, Request, Response, NextFunction, response } from 'express';

interface RequestWithBody extends Request {
    body: { [key: string]: string | undefined; };
}
const router = Router();
export { router };