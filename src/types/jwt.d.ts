/**
 * User roles
 */
enum UserRole {
    ADMINISTRATOR = "administrator",
    USER = "user"
}

export type UserJwtPayload = {
    /**
     * Sub
     */
    sub: string | ObjectId;

    /**
     * Username
     */
    username: string;

    /**
     * User role
     */
    role: UserRole;

    /**
     * Initiate at
     */
    iat: number;

    /**
     * Expire at
     */
    exp: number;
}