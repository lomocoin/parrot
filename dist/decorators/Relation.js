"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inflected_1 = require("inflected");
const MetaRepo_1 = __importDefault(require("../storage/MetaRepo"));
const Relation = (type) => (option) => (target, propertyName) => {
    const entityName = inflected_1.pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
    MetaRepo_1.default.pushRelation(entityName, type, {
        name: propertyName,
        option,
    });
};
exports.ManyToOne = Relation('ManyToOne');
exports.OneToMany = Relation('OneToMany');
exports.OneToOne = Relation('OneToOne');
exports.ManyToMany = Relation('ManyToMany');
//# sourceMappingURL=Relation.js.map