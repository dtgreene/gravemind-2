import { Injectable } from '@nestjs/common';
import { AnimalsAPI } from 'src/animals/animals.api';
import { PokemonAPI } from 'src/pokemon/pokemon.api';

@Injectable()
export class DataSourcesService {
  constructor(
    public readonly pokemon: PokemonAPI,
    public readonly animals: AnimalsAPI,
  ) {}

}
