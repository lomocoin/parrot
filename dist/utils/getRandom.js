"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomNumber_1 = __importDefault(require("./getRandomNumber"));
exports.default = (enums) => enums[getRandomNumber_1.default({ limit: enums.length - 1 })];
//# sourceMappingURL=getRandom.js.map