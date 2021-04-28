import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerModule } from './customers/customer.module';
import { PetModule } from './pets/pet.module';
import { CreditCardModule } from './credit-cards/credit-card.module';
import { AddressModule } from './addresses/address.module';
import { AccountModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
// import { BullModule } from '@mobizerg/nest-bull';
// import { BullConfigService } from './worker/bull-config-service';

@Module({
  imports: [
    /*BullModule.registerAsync({
      imports: [],
      useExisting: BullConfigService,
    }),*/
    MongooseModule.forRoot('mongodb://localhost/petshop', {
      useNewUrlParser: true,
      useCreateIndex: true,
    }),
    AccountModule,
    CustomerModule,
    AddressModule,
    PetModule,
    CreditCardModule,
    AuthModule,
    ScheduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
