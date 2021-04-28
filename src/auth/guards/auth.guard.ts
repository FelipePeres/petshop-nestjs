import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard(){

    canActivate(context: ExecutionContext){
        
        return super.canActivate(context) //canActivete testa se a rota pode ou nao ser ativada
    }

    handleRequest(err,user,info){

        if(err || !user){
            throw err || new UnauthorizedException();
        }
        
        return user
    }





}