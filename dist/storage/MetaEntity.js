"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MetaEntity extends Map {
    constructor() {
        super();
        this.set('string', new Set());
        this.set('integer', new Set());
        this.set('decimal', new Set());
        this.set('date', new Set());
        this.set('bool', new Set());
        this.set('enum', new Set());
        this.set('OneToMany', new Set());
        this.set('ManyToOne', new Set());
        this.set('OneToOne', new Set());
    }
}
exports.default = MetaEntity;
//# sourceMappingURL=MetaEntity.js.map