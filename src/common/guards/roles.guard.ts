import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '../../modules/users/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // const roles = this.reflector.get<string[]>('roles', context.getClass()); // controller level;
    // const roles = this.reflector.get<string[]>('roles', context.getHandler()); // handler level;

    const classRoles =
      this.reflector.get<string[]>('roles', context.getClass()) || [];
    const handlerRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    const roles = [...classRoles, ...handlerRoles];

    if (!roles || !roles.length) return true; // No roles defined, access granted by default

    const request = context.switchToHttp().getRequest();
    const user: User = request.user; // User info is stored as 'user' on request object after authentication

    return user && roles.includes(user.role);
  }
}
