import {JwtService} from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../accounts/account.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService{

    constructor(
        private readonly accountService : AccountService,
        private readonly jwtService : JwtService
    ){}

    async createToken(document, email, image, roles:string[]){
        //algumas coisas vem do customer
        const user: JwtPayload = {
            document: document,
            email: email,
            image: image,
            roles: roles
        };

        return this.jwtService.sign(user);
    }

    async validateUser(payload: JwtPayload):Promise<any>{
        return payload;
    //return let user = await this.accountService.findOneByUsername(payload.document);
    }


}

