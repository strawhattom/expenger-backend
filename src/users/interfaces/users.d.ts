/**
 * User Data
 */
export class UserData {
    /**
     * Username
     */
    username: string;

    /**
     * Password
     */
    password?: string;

    /**
     * E-mail
     */
    email?: string;

    /**
     * Creation date
     */
    createdAt?: Date;

    /**
     * Role, by default a standard user
     */
    role: UserRole;
}