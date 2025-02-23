import {  Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserInput } from "./dto/create-user.input";
import { UserDocument } from "./entities/user.entity";

@Controller("users")
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post("register")
    async register(@Body() input: CreateUserInput) {
        return await this.usersService.create(input);
    }

    @Get()
    async findAll(): Promise<UserDocument[]> {
        return await this.usersService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<UserDocument | null>  {
        return await this.usersService.findOne(id);
    }
}