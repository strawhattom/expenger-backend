import { UserJwtPayload } from "./jwt";

declare namespace Express {
    /**
     * Adds custom type declaration of Request type.
     */
    export interface Request {
        user?: UserJwtPayload
    }
}