import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly _reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    let encontrado: boolean = false;
    const roles: number[] = this._reflector.get<number[]>('roles', context.getHandler());

    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    const idRol = user.role.id;

    roles.forEach(id => {
      if (id == idRol) encontrado = true;
    });

    return user && user.role && encontrado;

  }

}
