"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallerFilePath = void 0;
function getCallerFilePath() {
    var _a;
    const stack = ((_a = new Error().stack) === null || _a === void 0 ? void 0 : _a.split("\n")) || [];
    return stack[2].slice(stack[2].lastIndexOf("(") + 1, stack[2].lastIndexOf(".js") + 3);
}
exports.getCallerFilePath = getCallerFilePath;
