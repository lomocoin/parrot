"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function applyMixins(derivedConstructor, baseConstructors) {
    baseConstructors.forEach(constructor => {
        Object.getOwnPropertyNames(constructor.prototype).forEach(name => {
            derivedConstructor.prototype[name] = constructor.prototype[name];
        });
    });
}
exports.default = applyMixins;
;
//# sourceMappingURL=applyMixins.js.map