import {Controller, Post, Put, Param, Body, HttpException, HttpStatus, UseInterceptors} from '@nestjs/common';
import { Result } from '../_core/utils/result/result.model';
import { ValidatorInterceptor } from '../_core/interceptors/validator.interceptor';
import { CreatePetContract } from './contracts/create-pet.contract';
import { Pet } from './models/pet.model';
import { PetService } from './pet.service';

@Controller('v1/pets')
export class PetController {

    constructor(
        private readonly service: PetService,
    ) {}
    @Post(':document')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async createPet(@Param('document') document, @Body() model: Pet) {
        try {
            const res = await this.service.create(document, model);
            return new Result(null, true, res, null);
          } catch (error) {
              throw new HttpException(new Result('nao foi possivel criar seu pet', false, null, error), HttpStatus.BAD_REQUEST);
          }
    }


    @Put(':document/:id')
    @UseInterceptors(new ValidatorInterceptor(new CreatePetContract()))
    async updatePet(@Param('document') document, @Param('id') id , @Body() model: Pet) {

        try {
            await this.service.update(document, id, model );
            return new Result(null, true, model, null);
        } catch (error) {
            throw new HttpException(new Result('nao foi possivel atualizar seu pet', false, null, error), HttpStatus.BAD_REQUEST);
        }

    }
}