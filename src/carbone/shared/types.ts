export type Csv = Array<CarboneItem>;

export class CarboneItem {
  constructor(
    public readonly id: string,
    public readonly type: string,
    public readonly name: string,
    public readonly impact: string,
    public readonly unit: string,
    public readonly status: string,
    public readonly localisation: string,
    public readonly sousLocalisation: string,
    public readonly tags: string[],
  ) {}

  public isValid() {
    return this.status.startsWith('Valide');
  }

  public isElement() {
    return this.type === 'Elément';
  }

  public isInMetropole() {
    return this.localisation === 'France continentale';
  }

  public getUniqueName() {
    return [
      this.type,
      this.name,
      this.unit,
      this.status,
      this.localisation,
      this.sousLocalisation,
    ].join('_');
  }
}
