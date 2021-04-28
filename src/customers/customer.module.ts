import { Module, CacheModule, OnModuleInit } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';
import { CustomerSchema } from './schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { AccountModule } from '../accounts/accounts.module';

@Module({
  imports:[
    CacheModule.register(),
    MongooseModule.forFeature([{name: 'Customer', schema: CustomerSchema}]),
    AuthModule,
    AccountModule,
  ],
  controllers: [ CustomerController ],
  providers: [CustomerService],
  exports: [ CustomerService ],
})
export class CustomerModule implements OnModuleInit {
  // tslint:disable-next-line: no-empty
  onModuleInit() {}
}
