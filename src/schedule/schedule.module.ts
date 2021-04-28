import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleController } from './controllers/schedule.controller';
import { RoomBookService } from './services/room-book.service';
import { RoomRepository } from './repositories/room.repository';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';

@Module({
  imports: [CqrsModule],
  controllers: [ScheduleController],
  providers: [
    RoomBookService,
    RoomRepository,
    ...CommandHandlers,
    ...EventHandlers,
  ],
})
export class ScheduleModule {}
