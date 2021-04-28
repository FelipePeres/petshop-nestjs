import { Contract } from '../../_core/utils/contracts/contract';
import { Flunt } from '../../_core/utils/flunt';
import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../dtos/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
    errors: any[];
    validate(model: UpdateCustomerDto): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.firstName, 5, 'Nome inválido');
        flunt.hasMinLen(model.lastName, 5, 'Nome inválido');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
