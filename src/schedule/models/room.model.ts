import { AggregateRoot } from '@nestjs/cqrs';
import { RoomBookedEvent } from '../events/room-booked.event';
//import {} from ''

//sala raiz
export class Room extends AggregateRoot{
    constructor(private readonly id: string){
        super();
    }

    //reservar sala
    book(customerId: string, date: Date){
        //regras negocio
        this.apply(new RoomBookedEvent(customerId, this.id)); 
    }




}