import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  /**
   * Authenticate a user with its username and password.
   * 
   * @param input LoginUserInput
   * @returns Promise
   */
  async login(input: LoginUserInput): Promise<{ access_token: string }> {
    const username = input.username;
    const password = input.password;

    const user = await this.usersService.findByName(username);

    // Username not found
    if (!user) {
      throw new UnauthorizedException(`User ${username} does not exist`)
    }

    const match = await bcrypt.compare(password, user.password);

    // Passwords do not match
    if (!match) {
      throw new UnauthorizedException("Wrong username or password");
    }
    const payload = { sub: user.id, username: user.username, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}