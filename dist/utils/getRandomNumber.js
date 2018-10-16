"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ limit }) => {
    if (typeof limit === 'number') {
        limit = [0, limit];
    }
    const [low, high] = limit;
    return Math.ceil(Math.random() * (high - low + 1) + low - 1);
};
//# sourceMappingURL=getRandomNumber.js.map