import { CarboneItem, Csv } from '../shared/types';

export class StringToCarboneItemTransformator {
  execute(rawCsv: string): Csv {
    const headerAndContent = rawCsv
      .split('\n')
      .filter((line) => line.length !== 0)
      .map((line, i) =>
        line.split(';').map((cell) => cell.replaceAll(`"`, '').trim()),
      );

    const [headers, ...lines]: string[][] = headerAndContent;
    return lines
      .map(this.toListOfObjects(headers))
      .filter(
        (item) => item.isValid() && item.isElement() && item.isInMetropole(),
      );
  }

  private toListOfObjects(headers: string[]) {
    return (line, i) => this.toObject(headers, i, line);
  }

  private toObject(
    headers: string[],
    index: number,
    line: string[],
  ): CarboneItem {
    const item = line.reduce((obj: object, cell: string, i: number) => {
      const header: string = headers[i];
      obj[header] = cell;
      return obj;
    }, {});

    return new CarboneItem(
      String(index),
      item['Type Ligne'],
      [
        item['Nom base français'],
        item['Nom attribut français'],
        item['Nom frontière français'],
        item['Type poste'],
      ]
        .filter((value) => value && value.length !== 0)
        .join(' '),
      item['Total poste non décomposé'],
      item['Unité français'],
      item["Statut de l'élément"],
      item['Localisation géographique'],
      item['Sous-localisation géographique français'],
      item['Tags français'].toLowerCase().split(','),
    );
  }
}
