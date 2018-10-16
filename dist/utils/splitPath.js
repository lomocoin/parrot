"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pathExp = /[\w\d]+\/?\d*/ig;
exports.default = (path) => (path.match(pathExp) || [])
    .map(matchPath => matchPath.split('/'));
//# sourceMappingURL=splitPath.js.map