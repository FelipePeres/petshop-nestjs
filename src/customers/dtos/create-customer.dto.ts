import {IsNotEmpty, IsEmpty} from 'class-validator';
import { User } from '../../user/models/user.model';
export class CreateCustomerDto {
      @IsNotEmpty()
      firstName: string;

      @IsNotEmpty()
      lastName: string;

      @IsNotEmpty()
      document: string;
      @IsNotEmpty()
      email: string;

      @IsNotEmpty()
      password: string;

      @IsNotEmpty()
      user: User;
}