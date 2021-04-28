import { BookRoomCommand } from '../book-room.command';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RoomRepository } from '../../repositories/room.repository';
import { HttpException, HttpStatus } from '@nestjs/common';

@CommandHandler(BookRoomCommand)
export class BookRoomHandler implements ICommandHandler<BookRoomCommand>{

    constructor(
        private readonly repository: RoomRepository,
    ) {}

    async execute(command: BookRoomCommand) {
        // tslint:disable-next-line: no-console
        console.log('BookRoomHandler: execute - executando o comando..');

        /*const room = await this.repository.findOneById(command.roomId);
        room.book(command.customerId);
        //room.commit();
        */

       // const room = this.publisher.mergeObjectContext(
        const room =  await this.repository.checkAvailability(command.roomId, command.date);
        // );

        if (room) {
            room.book(command.customerId, command.date);
            await this.repository.book(room);
            return;
        }

        throw new   HttpException('sala nao disponivel', HttpStatus.BAD_REQUEST);
    }
}
