import { CommandArgs } from "../constants";

export class Commands {
  private static readonly _ARGS = process.argv;
  public static execute() {
    let extractedValues = {
      path: "",
      part: ""
    };

    this._ARGS.forEach(arg => {
      if (!arg.match(/--.+=*/)) {
        return;
      }

      const [argument, value] = arg.split("=") as [
        keyof typeof CommandArgs,
        string
      ];

      const transformedValue = value
        .replace(/^("|')/, "")
        .replace(/("|')$/, "");

      if (argument in CommandArgs) {
        extractedValues[CommandArgs[argument] as keyof typeof extractedValues] =
          transformedValue;
      }
    });
    return extractedValues;
  }
}
