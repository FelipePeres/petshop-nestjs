import { Injectable } from '@nestjs/common';
import { ConfigService } from '../worker/config/config.service';
import { BullModuleOptions, BullOptionsFactory } from '@mobizerg/nest-bull';

@Injectable()
export class BullConfigService implements BullOptionsFactory {

  constructor(private readonly config: ConfigService) {}

  createBullOptions(name?: string): BullModuleOptions {
    return {
      name,
      options: {
        redis: {
          host: this.config.redisHost,
          port:  this.config.redisPort,
        },
        defaultJobOptions: {
          timeout: 30 * 1000,
          attempts: 2,
          backoff: {
            type: 'exponential',
            delay: 5 * 60 * 1000,
          },
        },
      },
    };
  }
}
