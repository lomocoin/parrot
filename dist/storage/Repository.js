"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Repository {
    constructor(entity) {
        this.data = new Map();
        this.Entity = entity;
    }
    insert(record) {
        this.data.set(record.id, record);
    }
    update(id, record) {
        this.data.set(id, Object.assign({}, this.data.get(id), record));
    }
    delete(id) {
        this.data.set(id, undefined);
    }
    select(filter) {
        const result = [...this.data.values()];
        if (!filter) {
            return result;
        }
        return result.filter(filter);
    }
    selectOne(find) {
        const result = [...this.data.values()];
        return result.find(find);
    }
}
exports.default = Repository;
//# sourceMappingURL=Repository.js.map