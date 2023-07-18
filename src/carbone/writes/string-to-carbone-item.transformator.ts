import { Csv } from '../shared/types';

export class StringToCarboneItemTransformator {
  execute(rawCsv: string): Csv {
    const headerAndContent = rawCsv
      .split('\n')
      .filter((line) => line.length !== 0)
      .map((line, i) => {
        if (i == 0) {
          return line
            .split(';')
            .map((cell) => cell.replaceAll(' ', '_').toLowerCase().trim());
        } else {
          return line.split(';').map((cell) => cell.replaceAll(`"`, '').trim());
        }
      });

    const [headers, ...content]: string[][] = headerAndContent;
    return content.map((cells) =>
      cells.reduce((obj, cell: string, i: number) => {
        const header: string = headers[i];
        obj[header] = cell;
        return obj;
      }, {}),
    );
  }
}
