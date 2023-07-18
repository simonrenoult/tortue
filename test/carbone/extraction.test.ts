import { equal } from 'node:assert';
import * as path from 'node:path';
import { describe, it } from 'mocha';
import { CsvFileExtractor } from '../../src/carbone/writes/csv-file.extractor';
import { StringToCarboneItemTransformator } from '../../src/carbone/writes/string-to-carbone-item.transformator';
import { InMemoryCarboneRepository } from '../../src/carbone/shared/in-memory-carbone.repository';
import { CarboneRepositoryLoader } from '../../src/carbone/writes/carbone-repository.loader';
import { FeedCarboneRepositoryCommand } from '../../src/carbone/writes/feed-carbone-repository.command';

describe('FeedCarboneRepositoryCommand', () => {
  it('extracts, transforms and loads the appropriate number of elements', async () => {
    const ctx = new TestContext();
    ctx.givenAProperlyConfiguredCarboneRepositoryFeeder();
    ctx.whenExecutingTheCarboneRepositoryFeeder();
    await ctx.thenTheRepositoryContainsTheAppropriateNumberOfElements();
  });
});

class TestContext {
  private command: FeedCarboneRepositoryCommand;
  private carboneRepository: InMemoryCarboneRepository;

  givenAProperlyConfiguredCarboneRepositoryFeeder() {
    this.carboneRepository = new InMemoryCarboneRepository();
    this.command = new FeedCarboneRepositoryCommand(
      path.resolve(__dirname, './carbone_short.csv'),
      new CsvFileExtractor(),
      new StringToCarboneItemTransformator(),
      new CarboneRepositoryLoader(this.carboneRepository),
    );
  }

  whenExecutingTheCarboneRepositoryFeeder() {
    this.command.onModuleInit();
  }

  async thenTheRepositoryContainsTheAppropriateNumberOfElements() {
    const carboneItems = await this.carboneRepository.findAll();
    equal(carboneItems.length, 5);
  }
}
