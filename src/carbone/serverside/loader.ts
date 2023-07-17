import { CarboneRepository } from "../core/carbone.repository";
import { Csv } from "../types";

export class Loader {
  constructor(private readonly carboneRepository: CarboneRepository) {}

  async execute(csv: Csv): Promise<void> {
    await this.carboneRepository.addFromCsv(csv);
  }
}
