import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@mobizerg/nest-bull';
import { Queue } from 'bull';

@Injectable()
export class BullService {
  constructor(
    @InjectQueue()
    private readonly queue: Queue,
  ) {}

  async addToQueue(data: any) {
    await this.queue.add('vamos la', data);
  }
}
