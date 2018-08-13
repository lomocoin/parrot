"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEntity {
    static nextVal() {
        return BaseEntity.sequence++;
    }
}
BaseEntity.sequence = 0;
exports.default = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map