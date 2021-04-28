import { Controller, Post, Body, UseGuards, Req, HttpException, HttpStatus } from '@nestjs/common';
import { RoomBookService } from '../services/room-book.service';
import { BookRoomDto } from '../dtos/book-room.dto';
import { JwtAuthGuard } from '../../auth/guards/auth.guard';
import { BookRoomCommand } from '../commands/book-room.command';
import { Result } from '../../_core/utils/result/result.model';



@Controller('v1/rooms')
export class ScheduleController{
    constructor(
        private readonly service: RoomBookService
    ){}

    @Post()
    @UseGuards(JwtAuthGuard)
    async Book(@Req() request, @Body() model: BookRoomDto){
        console.log('AppController:Book - iniciando a requisicao');
        try {
            const command = new BookRoomCommand(request.user.document, model.roomId,model.date);       
            await this.service.Book(command);//fazer reserva de sala
        } catch (error) {
            throw new HttpException(new Result('Nao foi possivel reservar sua sala',false,null,error),HttpStatus.BAD_REQUEST);
        }
    }
}