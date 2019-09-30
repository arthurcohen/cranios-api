import { Response, NextFunction, Request } from "express";
import * as jwt from "jsonwebtoken";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    if (token) {
        const jwtPayload = jwt.verify(token, 'segredo');

        if (jwtPayload) {
            res.setHeader('authorization', jwt.sign(jwtPayload, 'segredo'));

            next();
        }
    } else {
        res.status(401).send();
    }
};
