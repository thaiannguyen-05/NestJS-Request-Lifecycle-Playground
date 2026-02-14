import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Roles } from '../decorator/role.decorator';
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const roleDecorator = this.reflector.get(Roles, context.getHandler());

    if (roleDecorator.some((role) => role === request.payload?.role)) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized');
  }
}
