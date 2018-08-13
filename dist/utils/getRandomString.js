"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomNumber_1 = __importDefault(require("./getRandomNumber"));
exports.default = ({ limit }) => {
    if (typeof limit === 'number') {
        limit = [0, limit];
    }
    const len = getRandomNumber_1.default({ limit });
    return Array.apply(null, { length: len })
        .map(() => getRandomNumber_1.default({ limit: 1 }) === 1)
        .map((upperCase) => {
        return upperCase ? getRandomNumber_1.default({ limit: [65, 90] })
            : getRandomNumber_1.default({ limit: [97, 122] });
    })
        .map((code) => String.fromCharCode(code))
        .join('');
};
//# sourceMappingURL=getRandomString.js.map