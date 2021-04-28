import { Module, forwardRef } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { UserShema } from '../user/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CustomerSchema } from '../customers/schemas/customer.schema';
// import { PassportModule } from '@nestjs/passport';
// import { AuthService } from 'src/shared/services/auth.service';
// import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User',
    schema: UserShema,
    },
    {
    name: 'Customer',
    schema: CustomerSchema,
    },
  ]),
  forwardRef(() => AuthModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [ AccountService ],
})
export class AccountModule {}
