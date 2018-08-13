"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const getRandomNumber_1 = __importDefault(require("./getRandomNumber"));
exports.default = (format, start, end) => {
    const endDate = end ? moment_1.default(end, format).valueOf() : moment_1.default().valueOf();
    const startDate = start ? moment_1.default(start, format).valueOf() : 0;
    return moment_1.default(getRandomNumber_1.default({ limit: [startDate, endDate] }));
};
//# sourceMappingURL=getRandomDate.js.map