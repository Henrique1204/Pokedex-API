import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PostgresDB } from 'src/database/connections/postgres.module';
import { PokedexModule } from 'src/controllers/pokedex.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PostgresDB,
    PokedexModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
