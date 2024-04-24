import { Injectable } from '@nestjs/common';

import { PokemonRepositorie } from 'src/models/repositories/pokemon.model';

@Injectable()
export class PokemonService {
  constructor(private pokemonRepositorie: PokemonRepositorie) {}

  async findPokemonByDexNumberOrName({ searchValue }: { searchValue: string | number }) {
    const searchValueIsNumber = !isNaN(Number(searchValue));

    if (searchValueIsNumber) {
      return await this.pokemonRepositorie.findPokemonByDexNumber({
        pokemonDexNumber: Number(searchValue),
      });
    }

    return await this.pokemonRepositorie.findPokemonByName({ pokemonName: String(searchValue) });
  }
}
