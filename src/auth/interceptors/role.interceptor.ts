import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs'; 
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { Result } from '../../_core/utils/result/result.model';
import { tap } from 'rxjs/operators';

@Injectable()
export class RoleInterceptor implements NestInterceptor {

    constructor(public roles: string[]) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const user: JwtPayload = context.switchToHttp().getRequest().user;
        // tslint:disable-next-line: no-console
        console.log(user);

        let hasRole = false;
        user.roles.forEach((role) => {
            if (this.roles.includes(role)) {
                hasRole = true;
            }
        });

        if(!hasRole){
            throw new HttpException(
                new Result('Acesso nao autorizado',false,null,null), HttpStatus.FORBIDDEN
            );
        }

        const now = Date.now();
        return next.handle().pipe(
            tap(() => console.log(`After... ${Date.now() - now}ms`)),)
            ;

    }
}