import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as schema from 'src/database/schemas/postgers';

@Injectable()
export class DBConfigService {
  constructor(@Inject(ConfigService) private readonly configService: ConfigService) {}

  create = () => {
    return {
      tag: 'DATABASE',
      postgres: {
        url: this.configService.get<string>('DATABASE_URL_POSTGRES'),
        config: {
          hostname: this.configService.get<string>('DATABASE_HOSTNAME'),
          username: this.configService.get<string>('DATABASE_USERNAME'),
          password: this.configService.get<string>('DATABASE_PASSWORD'),
          database: this.configService.get<string>('DATABASE_NAME'),
        },
      },
      config: { schema },
    };
  };
}
