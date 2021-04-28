import {Controller, Post, Param, Body, HttpException, HttpStatus, UseInterceptors, Get} from '@nestjs/common';
import { Result } from '../_core/utils/result/result.model';
// import { ValidatorInterceptor } from '../_core/interceptors/validator.interceptor';
import { Address } from './models/address.model';
// import { CreateAddressContract } from './contracts/create-address.contract';
import { AddressService } from './address.service';
import { AddressType } from './enums/address-type.enum';


@Controller('v1/addresses')
export class AddressController {

    constructor(
        private readonly service: AddressService,
    ) {}
    @Post('/:document/billing')
   // @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addBillingAddress(@Param('document') document, @Body() model: Address) { // recebendo o documento e o endereço do cara que quero atualizar
        try {
            await this.service.create(document, model, AddressType.Billing);
            return model;
          } catch (error) {
              throw new HttpException(new Result('nao foi possivel adicionar seu endereço   ', false, null, error), HttpStatus.BAD_REQUEST);
          }
    }

    @Post('/:document/shipping')
    // @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
    async addShippingAddress(@Param('document') document, @Body() model: Address) { // recebendo o documento e o endereço do cara que quero atualizar
        try {
            const res = await this.service.create(document, model, AddressType.Shipping);
            return new Result(null, true, res, null);
          } catch (error) {
              throw new HttpException(new Result('nao foi possivel adicionar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
          } 
    }

    @Get('search/:zipcode')
    async search(@Param('zipcode') zipcode) {
        try {
            const response = await this.service.getAddressByZipCode(zipcode).toPromise();
            return new Result(null, true, response.data, null);
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel localizar o endereço', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }
}
