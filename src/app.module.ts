import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DrizzleDB } from 'src/modules/databaseConnections/drizzle/index.module';
import { PokedexModule } from 'src/modules/pokedex/index.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DrizzleDB,
    PokedexModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
