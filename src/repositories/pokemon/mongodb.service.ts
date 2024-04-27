import { Injectable } from '@nestjs/common';

import {
  FindoPokemonByNameParams,
  FindPokemonByDexNumberParams,
  PokemonRepositorie,
} from 'src/models/repositories/pokemon.model';

import * as PokemonEntity from 'src/models/entity/pokemon.model';
import { PokemonDTO } from 'src/models/DTOs/pokemon';

import { PrismaService } from 'src/database/connections/mongodb.service';

@Injectable()
export class PokemonMongodbRepositorie extends PokemonRepositorie {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findPokemonByDexNumber({
    pokemonDexNumber,
  }: FindPokemonByDexNumberParams): Promise<PokemonEntity.PokemonResponseData> {
    const { id, name, pokedex_number, types } = await this.prisma.pokemon.findFirst({
      where: {
        pokedex_number: pokemonDexNumber,
      },
    });

    return new PokemonDTO({ id, name, pokedex_number, types });
  }

  async findPokemonByName({
    pokemonName,
  }: FindoPokemonByNameParams): Promise<PokemonEntity.PokemonResponseData> {
    const { id, name, pokedex_number, types } = await this.prisma.pokemon.findFirst({
      where: {
        name: pokemonName.toLowerCase(),
      },
    });

    return new PokemonDTO({ id, name, pokedex_number, types });
  }
}
