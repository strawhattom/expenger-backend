import { UserRole } from "src/users/entities/user.entity";

export class UserJwtPayload {
    sub: string;
    username: string;
    role: UserRolel;
    iat: number;
    exp: number;
}