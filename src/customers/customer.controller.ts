// tslint:disable-next-line: max-line-length
import { Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseInterceptors, UseGuards, CacheInterceptor} from '@nestjs/common';
import { Md5 } from 'md5-typescript';
import { Result } from '../_core/utils/result/result.model';
import { CreateCustomerDto } from './dtos/create-customer.dto';
import { AccountService } from '../accounts/account.service';
import { CustomerService } from './customer.service';
import { QueryDto } from './dtos/query.dto';
import { ValidatorInterceptor } from '../_core/interceptors/validator.interceptor';
import { UpdateCustomerContract } from './contracts/update-customer.contract';
import { UpdateCustomerDto } from './dtos/update-customer.dto';
import { QueryContract } from '../_core/utils/contracts/query.contract';
import { CreateCustomerContract } from './contracts/create-customer.contract';
// import { AuthGuard } from '@nestjs/passport';
// import { IUser } from '../user/interfaces/user.interface';
import { User } from '../user/models/user.model';
import { ResultAlternative } from '../_core/utils/result/result-alternative.model';
// import { Customer } from './models/customer.model';

@Controller('v1/customers')
export class CustomerController {

    constructor(
        private readonly accountService: AccountService,
        private readonly customerService: CustomerService,
    ) {}

    @Post()
    @UseInterceptors(new ValidatorInterceptor(new CreateCustomerContract()))
    async create(@Body() model: CreateCustomerDto) {

        try {
            /* const modelUser = {} as IUser;
            modelUser.username = model.document;
            nmodelUser.password = model.password;
            modelUser.active   = true;*/

            const password = Md5.init(model.password);

            const userObject  = new User(model.document, password, ['user'], true);
            const userCreated = await this.accountService.create(userObject);
            model.user = userCreated;
            const customer = await this.customerService.create(model);

            return new Result('Cliente criado com suceso', true, customer, null);

        } catch (error) {
            throw new HttpException(new Result('nao foi possivel reailzar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    @Delete()
    delete() {
        return new Result('cliente removidos com suceso', true, null, null);
    }

    @Put(':document')
    @UseInterceptors(new ValidatorInterceptor(new UpdateCustomerContract()))
    async update(@Param('document') document, @Body() model: UpdateCustomerDto) {
        try {
            await this.customerService.update(document, model);
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('Não foi possivel reailzar seu cadastro', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    // @UseGuards(AuthGuard())
    // @UseInterceptors(CacheInterceptor)
    @Get()
    async getAll() {
        const array: any[] = [];
        // console.log(array);
        const customers = await this.customerService.findAll();

        console.log(customers);
        // const customers1 = await this.customerService.findAll();
        // array.push({ erro: 'erro'});
        // array.push({ erro1: 'erro2'});
        return new Result( null, true, customers, null);
        // return new ResultAlternative(array);
    }

    @Get(':document')
    async get(@Param('documet') document) {
        const customer = await this.customerService.find(document);
        return new Result( null, true, customer, null);
    }

    @Post('query')
    @UseInterceptors(new ValidatorInterceptor(new QueryContract()))
    async query(@Body() model: QueryDto) {
        const customers = await this.customerService.query(model);
        return new Result(null, true, customers, null);
    }
}
