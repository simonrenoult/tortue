import { equal } from 'node:assert';
import path from 'node:path';
import { describe, it } from 'mocha';
import { InMemoryCarboneRepository } from './in-memory-carbone.repository';
import { RawCsv } from '../src/types';
import { Extractor } from '../src/serverside/extractor';
import { Transformator } from '../src/serverside/transformator';
import { Loader } from '../src/serverside/loader';

describe('ETL', () => {
  it('loads csv from fs, transforms it and load it in memory', async () => {
    const extractor = new Extractor();
    const rawCsv = extractor.execute(
      path.resolve(__dirname, './carbone_short.csv'),
    );

    const transformator = new Transformator();
    const csv = transformator.execute(rawCsv as RawCsv);

    const carboneRepository = new InMemoryCarboneRepository();
    const loader = new Loader(carboneRepository);
    await loader.execute(csv);

    const carboneItems = await carboneRepository.findAll();
    equal(carboneItems.length, 5);
  });
});
