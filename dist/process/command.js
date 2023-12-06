"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Commands = void 0;
const constants_1 = require("../constants");
class Commands {
    static execute() {
        let extractedValues = {
            path: "",
            part: ""
        };
        this._ARGS.forEach(arg => {
            if (!arg.match(/--.+=*/)) {
                return;
            }
            const [argument, value] = arg.split("=");
            const transformedValue = value
                .replace(/^("|')/, "")
                .replace(/("|')$/, "");
            if (argument in constants_1.CommandArgs) {
                extractedValues[constants_1.CommandArgs[argument]] =
                    transformedValue;
            }
        });
        return extractedValues;
    }
}
exports.Commands = Commands;
Commands._ARGS = process.argv;
