import { Contract } from '../../_core/utils/contracts/contract';
import { Flunt } from '../../_core/utils/flunt';
import { Injectable } from '@nestjs/common';
import { CreditCard } from '../../credit-cards/models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
    errors: any[];
    validate(model: CreditCard): boolean {
        const flunt = new Flunt();

        flunt.hasMinLen(model.holder, 10, 'Nome inválido');
        flunt.isFixedLen(model.number, 5, 'Número do cartão inválido');
        flunt.isFixedLen(model.expiration, 4, 'Data de expiracao do cartao invalida');
        this.errors = flunt.errors;
        return flunt.isValid();
    }

}
