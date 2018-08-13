"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
const CustomError = (StatusCode) => (constructor) => {
    return class ErrorInstance extends constructor {
        constructor(...args) {
            super(...args);
            this.name = _1.ErrorMap.get(StatusCode) || _1.ErrorMap.get('InternalServerError');
        }
    };
};
exports.default = CustomError;
//# sourceMappingURL=CustomError.js.map