import { ObjectId } from "mongoose";
import { UserRole } from "../users/entities/user.entity";

export interface UserJwtPayload {
    sub: string | ObjectId;
    username: string;
    role: UserRole;
    iat: number;
    exp: number;
}

export interface ExpengerRequest extends Request {
    user?: UserJwtPayload
}