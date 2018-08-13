"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MetaEntity_1 = __importDefault(require("./MetaEntity"));
class MetaRepo extends Map {
    pushProperty(entityName, type, property) {
        if (!this.has(entityName)) {
            this.set(entityName, new MetaEntity_1.default());
        }
        const repo = this.get(entityName).get(type).add(property);
    }
    ;
    getMeta(entityName, type) {
        if (!this.has(entityName)) {
            return [];
        }
        return [...(this.get(entityName).get(type) || [])];
    }
    ;
    pushRelation(entityName, type, relation) {
        if (!this.has(entityName)) {
            this.set(entityName, new MetaEntity_1.default());
        }
        const repo = this.get(entityName).get(type).add(relation);
    }
}
exports.MetaRepo = MetaRepo;
exports.default = new MetaRepo();
//# sourceMappingURL=MetaRepo.js.map