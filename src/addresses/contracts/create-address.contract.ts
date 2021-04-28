import { Contract } from '../../_core/utils/contracts/contract';
import { Flunt } from '../../_core/utils/flunt';
import { Injectable } from '@nestjs/common';
import { Address } from '../models/address.model';

@Injectable()
export class CreateAddressContract implements Contract {
    errors: any[];
    validate(model: Address): boolean {
        const flunt = new Flunt();

        flunt.isFixedLen(model.zipCode, 8, 'CEP invalido');

        flunt.hasMinLen(model.street, 3 , 'Rua inválida');
        flunt.hasMinLen(model.neighborhood, 3, 'Bairro inválido');
        flunt.hasMinLen(model.city, 3, 'Cidade inválida');
        flunt.isFixedLen(model.state, 2, 'Estado inválido');
        flunt.isFixedLen(model.country, 3, 'Pais invalido');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
