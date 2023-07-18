import { OnModuleInit } from '@nestjs/common';
import { StringToCarboneItemTransformator } from './string-to-carbone-item.transformator';
import { CsvFileExtractor, PathIsNotAbsoluteError } from './csv-file.extractor';
import { CarboneRepositoryLoader } from './carbone-repository.loader';

export class FeedCarboneRepositoryCommand implements OnModuleInit {
  constructor(
    private readonly pathToCarboneCsv: string,
    private readonly csvFileExtractor: CsvFileExtractor,
    private readonly stringToCarboneItemTransformator: StringToCarboneItemTransformator,
    private readonly carboneRepositoryLoader: CarboneRepositoryLoader,
  ) {}
  onModuleInit() {
    const extractorResult = this.csvFileExtractor.execute(
      this.pathToCarboneCsv,
    );
    if (extractorResult instanceof PathIsNotAbsoluteError) {
      throw new Error('Error while loading carbone database');
    }

    const csv = this.stringToCarboneItemTransformator.execute(extractorResult);

    this.carboneRepositoryLoader
      .execute(csv)
      .then(() => {
        console.log('Carbone database loaded');
      })
      .catch((e) => {
        console.error('Fail to load carbone database:', e);
      });
  }
}
