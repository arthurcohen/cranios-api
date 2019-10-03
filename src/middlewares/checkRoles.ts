import { NextFunction, Response, Request } from "express-serve-static-core";
import { UserService } from "../services/userService";
import { User } from "../entity/User";

export const checkAdminRole = async (req: Request, res: Response, next: NextFunction) => {
    const reqUser: User = res.locals.user;

    if (reqUser) {
        const user: User = (await UserService.findUser(reqUser.id))[0];

        if (user && user.admin) {
            next();
        } else {
            res.status(401).send();
        }
    }
};
