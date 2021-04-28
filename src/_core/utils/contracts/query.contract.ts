import { Flunt } from '../flunt';
import { Contract } from './contract';
import { Injectable } from '@nestjs/common';
import { QueryDto } from '../../../customers/dtos/query.dto';

@Injectable()
export class QueryContract implements Contract {
    errors: any[];
    validate(model: QueryDto): boolean {

        const flunt = new Flunt();
        if (!model.query) {
            model.query = {};
        }

        flunt.isGreaterThan(model.take, 3, 'Sua query nao pode retornar mais que 1000 registros');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
