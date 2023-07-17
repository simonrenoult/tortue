import { CarboneItem, Csv } from "../src/types";
import { CarboneRepository } from "../src/core/carbone.repository";

export class InMemoryCarboneRepository implements CarboneRepository {
  constructor(private readonly carboneStore: Array<object> = []) {}

  async addFromCsv(csv: Csv): Promise<void> {
    this.carboneStore.push(...csv);
  }

  async findAll(): Promise<CarboneItem[]> {
    return this.carboneStore;
  }
}
