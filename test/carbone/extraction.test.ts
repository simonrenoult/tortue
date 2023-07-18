import { equal } from 'node:assert';
import * as path from 'node:path';
import { describe, it } from 'mocha';
import { CsvFileExtractor } from '../../src/carbone/writes/csv-file.extractor';
import { StringToCarboneItemTransformator } from '../../src/carbone/writes/string-to-carbone-item.transformator';
import { InMemoryCarboneRepository } from '../../src/carbone/shared/in-memory-carbone.repository';
import { CarboneRepositoryLoader } from '../../src/carbone/writes/carbone-repository.loader';
import { FeedCarboneRepositoryCommand } from '../../src/carbone/writes/feed-carbone-repository.command';

describe('FeedCarboneRepositoryCommand', () => {
  it('loads csv from fs, transforms it and load it in memory', async () => {
    // Given
    const carboneRepository = new InMemoryCarboneRepository();
    const command = new FeedCarboneRepositoryCommand(
      path.resolve(__dirname, './carbone_short.csv'),
      new CsvFileExtractor(),
      new StringToCarboneItemTransformator(),
      new CarboneRepositoryLoader(carboneRepository),
    );

    // When
    command.onModuleInit();

    // Then
    const carboneItems = await carboneRepository.findAll();
    equal(carboneItems.length, 5);
  });
});
