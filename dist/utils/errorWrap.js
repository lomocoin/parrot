"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (fn) => (req, res, next) => fn(req, res, next).catch(next);
//# sourceMappingURL=errorWrap.js.map