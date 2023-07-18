import { Module } from '@nestjs/common';
import { CarboneController } from './reads/carbone.controller';
import { InMemoryCarboneRepository } from './shared/in-memory-carbone.repository';
import { CarboneRepository } from './shared/carbone.repository';
import { FeedCarboneRepositoryCommand } from './writes/feed-carbone-repository.command';
import { StringToCarboneItemTransformator } from './writes/string-to-carbone-item.transformator';
import { resolve } from 'path';
import { CsvFileExtractor } from './writes/csv-file.extractor';
import { CarboneRepositoryLoader } from './writes/carbone-repository.loader';

@Module({
  imports: [],
  controllers: [CarboneController],
  providers: [
    {
      provide: 'PATH_TO_CARBONE_CSV',
      useValue: resolve(__dirname, '../assets', 'carbone.csv'),
    },
    {
      provide: 'CarboneRepository',
      useClass: InMemoryCarboneRepository,
    },
    {
      provide: 'Extractor',
      useClass: CsvFileExtractor,
    },
    {
      provide: 'Transformator',
      useClass: StringToCarboneItemTransformator,
    },
    {
      provide: 'Loader',
      inject: ['CarboneRepository'],
      useFactory: (carboneRepository: CarboneRepository) =>
        new CarboneRepositoryLoader(carboneRepository),
    },
    {
      provide: 'FeedCarboneRepositoryCommand',
      inject: ['PATH_TO_CARBONE_CSV', 'Extractor', 'Transformator', 'Loader'],
      useFactory: (
        pathToCarboneCsv: string,
        extractor: CsvFileExtractor,
        transformator: StringToCarboneItemTransformator,
        loader: CarboneRepositoryLoader,
      ) =>
        new FeedCarboneRepositoryCommand(
          pathToCarboneCsv,
          extractor,
          transformator,
          loader,
        ),
    },
  ],
})
export class CarboneModule {}
