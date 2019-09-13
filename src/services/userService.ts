import { User } from "../entity/User";
import { getRepository } from "typeorm";

export class UserService {
    static async persistUser(newUser: User): Promise<User> {
        const user = await getRepository(User).save(newUser);

        return user;
    }
}