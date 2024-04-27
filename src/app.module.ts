import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Descomentar caso queira usar PostgresSQL.
// import { PostgresDB } from 'src/database/connections/postgres.module';

import { PokedexModule } from 'src/controllers/pokedex.module';
import { PokemonModule } from 'src/controllers/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    // Descomentar caso queira usar PostgresSQL.
    // PostgresDB,
    PokedexModule,
    PokemonModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
