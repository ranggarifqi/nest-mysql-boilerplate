import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class AclGuard implements CanActivate {

  constructor (
    private readonly reflector: Reflector
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const hasRole: boolean = request.user.roles.some((role) => roles.includes(role.name));

    return request.user && request.user.roles && hasRole;
  }
}