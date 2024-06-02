import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { META_ROLES } from '../decorators/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    // console.log('User Role Guard') 
    const validRoles = this.reflector.get<string[]>(META_ROLES, context.getHandler());
    if(!validRoles) return true
    if(!validRoles.length) return true
    console.log({ validRoles })

    const request = context.switchToHttp().getRequest()
    const user = request.user

    if(!user) throw new BadRequestException('User not found')

    console.log({ userRoles: user.roles })

    for (const role of validRoles) {
      if(user.roles.includes(role)) return true
    }

    throw new ForbiddenException(`User ${user.fullname} need a valid role ${validRoles.join(' or ')}`)
  }
}
