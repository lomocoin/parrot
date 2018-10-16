"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseEntity {
    constructor() {
        this.id = -1;
        this.createdAt = new Date().getTime();
    }
    static nextVal() {
        return BaseEntity.sequence++;
    }
}
BaseEntity.sequence = 0;
exports.default = BaseEntity;
//# sourceMappingURL=BaseEntity.js.map