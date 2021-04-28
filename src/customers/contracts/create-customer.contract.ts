import { Contract } from '../../_core/utils/contracts/contract';
import { Flunt } from '../../_core/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../dtos/create-customer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
    errors: any[];
    validate(model: CreateCustomerDto): boolean {
        const flunt = new Flunt();
       // flunt.hasMinLen(model.firstName,5,'Nome inválido');
        flunt.isEmail(model.email, 'Email inválido');
        flunt.isFixedLen(model.document, 11, 'Cpf invalido');
        flunt.hasMinLen(model.password, 6, 'Senha inválida');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
