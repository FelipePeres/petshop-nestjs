import { NestInterceptor, Injectable, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
// import { Contract } from "src/modules/backoffice/contracts/contract";
import { Contract } from '../utils/contracts/contract';
import { Result } from '../utils/result/result.model';
import {tap} from 'rxjs/operators';

@Injectable()
export class ValidatorInterceptor implements NestInterceptor {

    constructor(
        public contract: Contract,
    ) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any>{
        const body = context.switchToHttp().getRequest().body;
        const valid  = this.contract.validate(body);
        if (!valid) {
            throw new HttpException(
                new Result('ops, algo saiu errado',
                        false,
                        null,
                        this.contract.errors),
                        HttpStatus.BAD_REQUEST,
                );
        }

        const now = Date.now();
        return next.handle().pipe(
            // tslint:disable-next-line: no-console
            tap(() => console.log(`After... ${Date.now() - now}ms`)) )
            ;
    }
}
