export type Csv = Array<CarboneItem>;

export class CarboneItem {
  public name: string;
  constructor(
    public readonly id: string,
    public readonly typeLigne: string,
    name: string,
    public readonly impact: string,
    public readonly unit: string,
    public readonly status: string,
    public readonly localisation: string,
    public readonly sousLocalisation: string,
    public readonly typeElement: string,
    public readonly tags: string[],
  ) {
    this.name = name.charAt(0).toUpperCase() + name.slice(1);
  }

  public isValid() {
    return this.status.startsWith("Valide");
  }

  public isElement() {
    return this.typeLigne === "Elément";
  }

  public isInMetropole() {
    return this.localisation === "France continentale";
  }

  public estUnFacteurDEmission() {
    return this.typeElement === "Facteur d'émission";
  }

  public getKey() {
    return [
      this.typeLigne,
      this.name,
      this.unit,
      this.status,
      this.localisation,
      this.sousLocalisation,
    ].join("_");
  }
}
