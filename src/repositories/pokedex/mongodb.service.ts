import { Injectable } from '@nestjs/common';

import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';
import * as PokemonEntity from 'src/models/entity/pokemon.model';

import { PrismaService } from 'src/database/connections/mongodb.service';

import { PokemonDTO } from 'src/models/DTOs/pokemon';

@Injectable()
export class PokedexMongodbRepositorie extends PokedexRepositorie {
  private readonly DEFAULT_PAGE: number = 1;
  private readonly DEFAULT_LIMIT: number = 10;

  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findPokedexPaginated({ page = this.DEFAULT_PAGE, limit = this.DEFAULT_LIMIT }) {
    const paginationOffset = (page - this.DEFAULT_PAGE) * limit;

    const pokedexPaginatedData = await this.prisma.pokemon.findMany({
      skip: paginationOffset,
      take: 1,
      orderBy: {
        pokedex_number: 'asc',
      },
    });

    const pokedexPaginatedMapped = pokedexPaginatedData.map(
      ({ id, name, pokedex_number, types }) => new PokemonDTO({ id, name, pokedex_number, types }),
    );

    return pokedexPaginatedMapped;
  }

  async getTotalPages({ limit = this.DEFAULT_LIMIT }) {
    const totalRecordsResult = await this.prisma.pokemon.count();

    const totalPages = Math.ceil(totalRecordsResult / limit);

    return totalPages;
  }

  async insertPokemon({ name, pokedexNumber, types }: PokemonEntity.PokemonInseertData) {}
}
