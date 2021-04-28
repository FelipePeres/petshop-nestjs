import {Controller, Post, Body} from '@nestjs/common';
// import { AccountService } from "./account.service";
import { IUser } from '../user/interfaces/user.interface';
import { AuthService } from './auth.service';
// import { AuthGuard } from "@nestjs/passport";
// import {AuthService} from "../shared/services/auth.service";

@Controller('v1/auth')
export class AuthController {

 constructor(
    // private readonly accountService: AccountService,
    private readonly authService: AuthService,
 ) {}

@Post()
async createToken(@Body() data: IUser): Promise<any> {
    try {
        // return await this.authService.createToken();
    } catch (error) {
        // tslint:disable-next-line: no-console
        console.log(error);
    }
}
}
