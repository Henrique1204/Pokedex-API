import * as PokemonEntity from 'src/models/entity/pokemon.model';

export type FindPokemonByDexNumberParams = {
  pokemonDexNumber: number;
};

export type FindoPokemonByNameParams = {
  pokemonName: string;
};

export abstract class PokemonRepositorie {
  abstract findPokemonByDexNumber(
    params: FindPokemonByDexNumberParams,
  ): Promise<PokemonEntity.PokemonResponseData>;

  abstract findPokemonByName(
    params: FindoPokemonByNameParams,
  ): Promise<PokemonEntity.PokemonResponseData>;
}
