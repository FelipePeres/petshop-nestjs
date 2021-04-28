import { Injectable } from '@nestjs/common';
import { Room } from '../models/room.model';

@Injectable()
export class RoomRepository{
    /*async findOneById(id: string): Promise<Room>{
        console.log('RoomRepository:findOneById - recuperando a sala...');
        return new Room(id); //retorna uma sala
        
    }*/

    async checkAvailability(id: string , data: Date): Promise<Room>{
        //ler do banco
        return new Room('123456789');
    }

    async book(room: Room){
        //salvar no banco

    }

}

