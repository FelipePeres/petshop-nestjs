import { Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Pet } from './models/pet.model';
import { ICustomer } from '../customers/interfaces/customer.interface';

@Injectable()
export class PetService{

    constructor(
        @InjectModel('Customer') private readonly model: Model<ICustomer>,
    ) {}

    async create(document: string , data: Pet): Promise<ICustomer> {
        const options = {upsert: true, new : true};
        return await this.model.findOneAndUpdate({document}, {
            $push: {
                pets: data,
            },
        }, options);
    }

    async update(document: string, id: string, data: Pet): Promise<ICustomer> {
        return await this.model.findOneAndUpdate({document, 'pets._id': id}, {
            $set: {
                'pets.$': data,
            },
        });
    }
}
