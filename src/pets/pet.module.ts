import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { CustomerSchema } from '../customers/schemas/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }])],
  controllers: [PetController],
  providers: [PetService],
})
export class PetModule {}
