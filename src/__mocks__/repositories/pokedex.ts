import { PokedexRepositorie } from 'src/models/repositories/pokedex.model';

import * as PokemonEntity from 'src/models/entity/pokemon.model';

import { pokedexResponseMock } from '../pokemon';

export const DEFAULT_TOTAL_PAGE = 2;
export const DEFAULT_PAGE: number = 1;
export const DEFAULT_LIMIT: number = 10;

export const findPokedexPaginatedMock = jest.fn((params: any) => pokedexResponseMock);
export const getTotalPagesMock = jest.fn((params: any) => DEFAULT_TOTAL_PAGE);
export const insertPokemonMock = jest.fn((params: any) => undefined);

export class PokedexRepositorieMock extends PokedexRepositorie {
  async findPokedexPaginated({ page = DEFAULT_PAGE, limit = DEFAULT_LIMIT }) {
    return findPokedexPaginatedMock({ page, limit });
  }

  async getTotalPages({ limit = DEFAULT_LIMIT }) {
    return getTotalPagesMock({ limit });
  }

  async insertPokemon({ name, pokedexNumber, types }: PokemonEntity.PokemonInsertData) {
    insertPokemonMock({ name, pokedexNumber, types });
  }
}
