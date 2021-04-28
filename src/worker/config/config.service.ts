import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  constructor(
    public readonly redisHost: string = '',
    public readonly redisPort: number = 0,
    public readonly redisDatabase: string = '',
    public readonly redisPrefix: string = '',
  ) {}
}
