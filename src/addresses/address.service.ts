import { Model } from 'mongoose';
import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from './models/address.model';
import { AddressType } from './enums/address-type.enum';
import { ICustomer } from '../customers/interfaces/customer.interface';

@Injectable()
export class AddressService{

    constructor(
        @InjectModel('Customer') private readonly model: Model<ICustomer>,
        private readonly httpService: HttpService,
    ) {}

    async create(document: string, data: Address, type: AddressType): Promise<ICustomer>{
        // tslint:disable-next-line: max-line-length
        const options = {upsert: true};  // setDefaultsOnInsert:true se ele buscar e nao existir um billingadress no cliente ele vai criar um, se ja tiver ele vai atualizar. 
        if (type === AddressType.Billing) {
            return await this.model.findOneAndUpdate({document}, {
                $set: {
                    billingAddress: data,
                },
            }, options);
        } else {

            return await this.model.findOneAndUpdate({document}, {
                $set: {
                    shippingAddress: data,
                },
            }, options);
        }
    }

    getAddressByZipCode(zipcode: string){
        const url = `https://viacep.com.br/ws/${zipcode}/json/`;
        return this.httpService.get(url);
    }
   /*async addBillingAddress(document: string, data: Address): Promise<Customer>{
        const options = {upsert: true};//se ele buscar e nao existir um billingadress no cliente ele vai criar um, se ja tiver ele vai atualizar. 
        return await this.model.findOneAndUpdate({document},{
            $set:{
                billingAddress: data,
            },
        },options);
    }

    async addShippingAddress(document: string, data: Address): Promise<Customer>{
        const options = {upsert: true};//se ele buscar e nao existir um billingadress no cliente ele vai criar um, se ja tiver ele vai atualizar. 
        return await this.model.findOneAndUpdate({document},{
            $set:{
                shippingAddress: data,
            },  
        },options);
    }*/    
}