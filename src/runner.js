"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AocRunner = void 0;
const fs = __importStar(require("fs"));
const process_1 = require("./process");
class AocRunner {
    static get _controllerDir() {
        return this._entryPoint + "/controller";
    }
    static get _inputPath() {
        return this._entryPoint + "/input";
    }
    static register() {
        this._entryPoint = __dirname;
        const { part, path } = process_1.Commands.execute();
        const parsedToInt = !!part ? parseInt(part) : undefined;
        if (!path) {
            this._runAll(parsedToInt);
            return;
        }
        this._runSingle.bind(this)(parsedToInt)(path);
    }
    static _getControllers() {
        return new Promise(resolve => {
            fs.readdir(this._controllerDir, (_, files) => {
                resolve(files);
            });
        });
    }
    static _runAll(part) {
        return __awaiter(this, void 0, void 0, function* () {
            const controllerFiles = yield this._getControllers();
            controllerFiles.forEach(this._runSingle.bind(this)(part));
        });
    }
    static _getAocAndInput(controllerFilePath) {
        var _a, _b;
        const aocClass = (_a = require(`${this._controllerDir}/${controllerFilePath}`)) === null || _a === void 0 ? void 0 : _a.default;
        const input = (_b = require(`${this._inputPath}/${controllerFilePath}`)) === null || _b === void 0 ? void 0 : _b.default;
        return { aoc: new aocClass(), input };
    }
    static _runSingle(part) {
        return (filePath) => {
            const transformedFile = filePath.replace(/.ts$/, "") + ".js";
            const { aoc, input } = this._getAocAndInput(transformedFile);
            this._runAOC(aoc, input, part);
            console.log("\n\n");
        };
    }
    static _runAOC(aocClass, value, part) {
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
exports.AocRunner = AocRunner;
AocRunner._entryPoint = "";
