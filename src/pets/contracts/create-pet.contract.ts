import { Flunt } from '../../_core/utils/flunt';
import { Injectable } from '@nestjs/common';
import { Pet } from '../models/pet.model';
import { Contract } from '../../_core/utils/contracts/contract';

@Injectable()
export class CreatePetContract implements Contract {
    errors: any[];
    validate(model: Pet): boolean {
        const flunt = new Flunt();
        flunt.hasMinLen(model.name, 2, 'Nome inválido');
        flunt.hasMinLen(model.name, 3, 'Gênero inválido');
        flunt.hasMinLen(model.name, 3, 'Tipo inválido');
        flunt.hasMinLen(model.name, 3, 'Raça inválida');
        this.errors = flunt.errors;
        return flunt.isValid();
    }
}
