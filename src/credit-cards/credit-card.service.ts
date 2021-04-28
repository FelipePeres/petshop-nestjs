import { Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreditCard } from './models/credit-card.model';
import { ICustomer } from '../customers/interfaces/customer.interface';

@Injectable()
export class CreditCardService {

    constructor(
        @InjectModel('Customer') private readonly model: Model<ICustomer>,
    ) {}
   async saveOrUpdateCreditCard(document: string, data: CreditCard): Promise<ICustomer> {
        const options = {upsert: true};
        return await this.model.findOneAndUpdate({ document }, {
        $set: {
                card: data,
            },
        }, options);
    }
}
