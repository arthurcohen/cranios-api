import { Response, NextFunction, Request } from "express";
import * as jwt from "jsonwebtoken";

export const JWT_HEADER = 'authorization';
export const SECRET = 'segredo';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
        const jwtPayload = jwt.verify(token, SECRET);

        if (jwtPayload) {
            res.setHeader(JWT_HEADER, jwt.sign(jwtPayload, SECRET));

            res.locals.user = jwtPayload['user'];

            next(); 
        }
    } else {
        res.status(401).send();
    }
};
