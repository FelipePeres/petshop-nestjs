import { Module, HttpModule } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { CustomerSchema } from '../customers/schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    HttpModule,
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
