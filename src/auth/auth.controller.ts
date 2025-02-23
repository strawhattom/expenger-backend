import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { UserJwtPayload } from './interfaces/jwt';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    login(@Body() inputs: LoginUserInput) {
        return this.authService.login(inputs);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Req() request: (Request & { user: UserJwtPayload })) {
        return request.user;
    }
}
