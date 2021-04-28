import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from '../user/interfaces/user.interface';
import { User } from '../user/models/user.model';
// import { Customer } from 'src/customers/models/customer.model';
import { ICustomer } from 'src/customers/interfaces/customer.interface';
import { Md5 } from 'md5-typescript';

@Injectable()
export class AccountService {

    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        @InjectModel('Customer') private readonly customerModel: Model<ICustomer>,
    ) {}

    async create(data: User): Promise<IUser> {
        const userCreated = new this.userModel(data);
        return await userCreated.save();
    }

    async update(username: string, data: any): Promise<IUser> {
        return await this.userModel.findOneAndUpdate({ username }, data);
    }

    async authenticate(username: string, password: any): Promise<ICustomer> {

        const customer = await this.customerModel
            .findOne({'user.username': username})
            .populate('user')
            .exec();
            // await Md5.init(`${password}${process.env.SALT_KEY}`);
        const pass = Md5.init(password);
        if (pass.toString() === customer.user.password.toString()) {
            return customer;
        } else {
            return null;
        }
    }

}