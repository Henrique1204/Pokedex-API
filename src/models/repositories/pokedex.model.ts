import * as PokemonEntity from 'src/models/entity/pokemon.model';

export type PaginationControl = {
  page?: number;
  limit?: number;
};

export type LimitControl = Pick<PaginationControl, 'limit'>;

export abstract class PokedexRepositorie {
  abstract findPokedexPaginated(
    paginationControl: PaginationControl,
  ): Promise<PokemonEntity.PokemonResponseData[]>;

  abstract getTotalPages(limitControl: LimitControl): Promise<number>;

  abstract insertPokemon(newPokemonPayload: PokemonEntity.PokemonInseertData): Promise<void>;
}
