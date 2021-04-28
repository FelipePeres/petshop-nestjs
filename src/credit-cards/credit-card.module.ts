import { Module } from '@nestjs/common';
import { CreditCardController } from './credit-card.controller';
import { CreditCardService } from './credit-card.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from '../customers/schemas/customer.schema';
// import { CustomerModule } from '../customers/customer.module';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  controllers: [CreditCardController],
  providers: [CreditCardService],
})
export class CreditCardModule {}
