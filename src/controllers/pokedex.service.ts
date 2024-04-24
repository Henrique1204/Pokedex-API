import { Injectable } from '@nestjs/common';

import {
  PokedexRepositore,
  LimitControl,
  PaginationControl,
} from 'src/models/pokedexRepositorie.model';

@Injectable()
export class PokedexService {
  constructor(private pokedexRepositorie: PokedexRepositore) {}

  async findPokedexPaginated({ limit, page }: PaginationControl) {
    return this.pokedexRepositorie.findPokedexPaginated({ limit, page });
  }

  async getTotalPages({ limit }: LimitControl) {
    return this.pokedexRepositorie.getTotalPages({ limit });
  }
}
