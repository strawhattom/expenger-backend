import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

/**
 * User roles
 */
export enum UserRole {
    ADMINISTRATOR = "administrator",
    USER = "user"
}

/**
 * User Entity/Schema
 */
@Schema()
export class User {

    /**
     * Username
     */
    @Prop({required: true, immutable: true})
    username: string;

    /**
     * Password
     */
    @Prop({required: true})
    password: string;

    /**
     * E-mail
     */
    @Prop()
    email?: string;

    /**
     * Creation date
     */
    @Prop({type: Date, default: Date.now, immutable: true})
    createdAt: Date;

    /**
     * Role, by default a standard user
     */
    @Prop({type: String, default: UserRole.USER})
    role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);