import { Pet } from '../../pets/models/pet.model';
import { Address } from '../../addresses/models/address.model';
import { CreditCard } from '../../credit-cards/models/credit-card.model';
import { User } from '../../user/models/user.model';

export class Customer {
    constructor(
        public firstName: string,
        public lastName: string,
        public document: string,
        public email: string,
        public pets: Pet[],
        public billingAddress: Address,
        public shippingAddress: Address,
        public creditCard: CreditCard,
        public user: User,
    ) {}
}
