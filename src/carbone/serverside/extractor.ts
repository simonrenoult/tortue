import path from "node:path";
import fs from "node:fs";
import { RawCsv } from "../types";

class PathIsNotAbsoluteError extends Error {
  constructor(actualPath: string) {
    super(`Path ${actualPath} is not absolute`);
  }
}

export class Extractor {
  execute(pathToFile: string): RawCsv | PathIsNotAbsoluteError {
    if (!path.isAbsolute(pathToFile))
      return new PathIsNotAbsoluteError(pathToFile);
    const content = fs.readFileSync(pathToFile, { encoding: "latin1" });
    const lines = content.split("\n");
    return lines
      .filter((line) => line.length !== 0)
      .map((line) => line.split(";").map((cell) => cell.trim()));
  }
}
