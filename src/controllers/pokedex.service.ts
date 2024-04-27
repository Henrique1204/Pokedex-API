import { Injectable } from '@nestjs/common';

import { PokemonInsertData } from 'src/models/entity/pokemon.model';

import {
  PokedexRepositorie,
  LimitControl,
  PaginationControl,
} from 'src/models/repositories/pokedex.model';

@Injectable()
export class PokedexService {
  constructor(private pokedexRepositorie: PokedexRepositorie) {}

  async findPokedexPaginated({ limit, page }: PaginationControl) {
    return this.pokedexRepositorie.findPokedexPaginated({ limit, page });
  }

  async getTotalPages({ limit }: LimitControl) {
    return this.pokedexRepositorie.getTotalPages({ limit });
  }

  async insertPokemon({ name, pokedexNumber, types }: PokemonInsertData) {
    return this.pokedexRepositorie.insertPokemon({ name, pokedexNumber, types });
  }
}
