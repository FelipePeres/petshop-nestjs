import { Pet } from '../../pets/models/pet.model';
import { Address } from '../../addresses/models/address.model';
import { CreditCard } from '../../credit-cards/models/credit-card.model';
import { IUser } from '../../user/interfaces/user.interface';
import { ObjectID } from 'bson';
import * as mongoose from 'mongoose';
import { User } from 'src/user/models/user.model';

export interface ICustomer extends mongoose.Document {
    // constructor(
       id?: ObjectID;
       firtname: string;
       lastname: string;
       document: string;
       email: string;
       pets: Pet[];
       billingAddress: Address;
       shippingAddress: Address;
       creditCard: CreditCard;
       user: User;
    // ){}
}
