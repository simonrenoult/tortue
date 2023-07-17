import { Csv, RawCsv } from '../types';

export class Transformator {
  execute(headerAndContent: RawCsv): Csv {
    const [headers, ...content]: string[][] = headerAndContent;
    return content.map((cells) =>
      cells.reduce((obj, cell: string, i: number) => {
        const header: string = headers[i];
        obj.set(header, cell);
        return obj;
      }, new Map<string, string>()),
    );
  }
}
