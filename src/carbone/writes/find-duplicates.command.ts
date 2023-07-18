import { CarboneRepository } from '../shared/carbone.repository';
import { OnModuleInit } from '@nestjs/common';

export class FindDuplicatesCommand implements OnModuleInit {
  constructor(private readonly carboneRepository: CarboneRepository) {}
  onModuleInit(): any {
    this.carboneRepository.findAll().then((items) => {
      const result = items.reduce((obj, cur) => {
        if (!obj[cur.getUniqueName()]) {
          obj[cur.getUniqueName()] = 1;
        } else {
          obj[cur.getUniqueName()] += 1;
        }
        return obj;
      }, {});

      let found = 0;
      for (const resultKey in result) {
        const numberOfOccurrence = result[resultKey];

        if (numberOfOccurrence > 1) {
          found += 1;
          console.log(resultKey, numberOfOccurrence);
        }
      }

      console.log(found);
    });
  }
}
