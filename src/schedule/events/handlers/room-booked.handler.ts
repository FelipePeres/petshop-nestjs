import { IEventHandler } from '@nestjs/cqrs';
import { EventsHandler } from '@nestjs/cqrs/dist/decorators/events-handler.decorator';
import { RoomBookedEvent } from '../room-booked.event';
import { RoomRepository } from 'src/schedule/repositories/room.repository';

@EventsHandler(RoomBookedEvent)
export class RoomBookedHandler implements IEventHandler<RoomBookedEvent>{
    handle(event: RoomBookedEvent){         
        console.log('RoomBookedEvent: handle - manipulando o evento room booked...');
    }

}