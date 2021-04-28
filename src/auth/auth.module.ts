import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AccountModule } from '../accounts/accounts.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
//https://docs.nestjs.com/techniques/authentication
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
        //secretOrPrivateKey:'secretKey',
        secret:'secretKey123',
        signOptions:{
          expiresIn:3600,
        },
    }),  
    forwardRef(() => AccountModule)
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  exports:[PassportModule, AuthService]
})
export class AuthModule {}