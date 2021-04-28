import {Controller, Post, Param, Body, HttpException, HttpStatus, UseInterceptors} from '@nestjs/common';
import { Result } from '../_core/utils/result/result.model';
import { ValidatorInterceptor } from '../_core/interceptors/validator.interceptor';
import { CreditCard } from '../credit-cards/models/credit-card.model';
import { CreateCreditCardContract } from '../customers/contracts/create-credit-card.contract';
import { CreditCardService } from './credit-card.service';

@Controller('v1/credit-cards')
export class CreditCardController{

    constructor(
        private readonly creditCardService: CreditCardService,
    ) {}

    @Post('/:document')
    @UseInterceptors(new ValidatorInterceptor(new CreateCreditCardContract()))
    async createCreditCard(@Param('document') document, @Body() model: CreditCard) {
        try {
            await this.creditCardService.saveOrUpdateCreditCard(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel adicionar o seu cartao de credito', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

}


