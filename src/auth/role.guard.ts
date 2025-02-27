import {
    CanActivate,
    ExecutionContext,
    Injectable,
    SetMetadata,
  } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/users/entities/user.entity';
  
@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) {}

  /**
   * Authenticate a user admin by guarding
   */
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const userType = request.user.userType;
    return roles.some(r => r === userType);
  }
}

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);