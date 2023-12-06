import * as fs from "fs";
import { AOC } from "./implementation";
import { Commands } from "./process";
import { getCallerFilePath } from "./lib/caller";

export class AocRunner {
  private static _entryPoint = "";

  private static get _controllerDir() {
    return this._entryPoint + "/controller";
  }

  private static get _inputPath() {
    return this._entryPoint + "/input";
  }

  public static register() {
    const pathArray = getCallerFilePath().split("/");

    pathArray.pop();

    this._entryPoint = pathArray.join("/");

    const { part, path } = Commands.execute();

    const parsedToInt = !!part ? parseInt(part) : undefined;

    if (!path) {
      this._runAll(parsedToInt);
      return;
    }

    this._runSingle.bind(this)(parsedToInt)(path);
  }

  private static _getControllers() {
    return new Promise<string[]>(resolve => {
      fs.readdir(this._controllerDir, (_, files) => {
        resolve(files);
      });
    });
  }

  private static async _runAll(part?: number) {
    const controllerFiles = await this._getControllers();
    controllerFiles.forEach(this._runSingle.bind(this)(part));
  }

  private static _getAocAndInput(controllerFilePath: string) {
    const aocClass: typeof AOC =
      require(`${this._controllerDir}/${controllerFilePath}`)?.default;
    const input: string =
      require(`${this._inputPath}/${controllerFilePath}`)?.default;

    return { aoc: new aocClass(), input };
  }

  protected static _runSingle(part?: number) {
    return (filePath: string) => {
      const transformedFile = filePath.replace(/.ts$/, "") + ".js";
      const { aoc, input } = this._getAocAndInput(transformedFile);
      this._runAOC(aoc, input, part);
      console.log("\n\n");
    };
  }

  private static _runAOC(aocClass: AOC, value: string, part?: number) {
    const result = aocClass.runnerParser(value);

    let timeBefore = new Date().getTime();
    if (part === 1 || !part) {
      console.log(`=================\n${aocClass.day}\n=================`);
      console.log(`Result: ${aocClass.part1(result)}`);
      const timeAfter = new Date().getTime();
      console.log(`Execution Ms: ${timeAfter - timeBefore}ms`);
    }

    if (aocClass.part2 && (part === 2 || !part)) {
      timeBefore = new Date().getTime();
      console.log("=================");
      console.log(`Result: ${aocClass.part2(result)}`);
      const timeAfter = new Date().getTime();
      console.log(`Executions Ms: ${timeAfter - timeBefore}ms`);
    }
    console.log("=================");
  }
}
