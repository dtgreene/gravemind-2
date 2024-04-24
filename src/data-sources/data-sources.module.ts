import { Module } from '@nestjs/common';
import { DataSourcesService } from './data-sources.service';
import { AnimalsModule } from 'src/animals/animals.module';
import { PokemonModule } from 'src/pokemon/pokemon.module';

@Module({
  imports: [PokemonModule, AnimalsModule],
  providers: [DataSourcesService],
  exports: [DataSourcesService],
})
export class DataSourcesModule {}
