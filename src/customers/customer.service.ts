import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { QueryDto } from './dtos/query.dto';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { ICustomer } from './interfaces/customer.interface';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel('Customer') private readonly model: Model<ICustomer>,
    ) {}

    async create(data: CreateCustomerDto): Promise<ICustomer> {
        const customerCreated = new this.model(data);
        return await customerCreated.save();
    }
    async update(document: string, data: UpdateCustomerDto): Promise<ICustomer> {
        return await this.model.findOneAndUpdate({document}, data);
    }

    async findAll(): Promise<ICustomer[]> {
        return await this.model
        .find({}, '-lastName')
        .sort('firtName')
        .exec();
    }

    async find(document): Promise<ICustomer> {
        return await this.model
                         .findOne({document}/*,*/)
                         .populate('user', '-password')
                         .exec();
    }

    async query(model: QueryDto): Promise<ICustomer[]> {

        return await this.model
        .find(model.query,
            model.fields,
            {
                skip: model.skip,
                limit: model.take,
            })
            .sort(model.sort)
            .exec();
    }
}
