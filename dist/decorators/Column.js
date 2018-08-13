"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inflected_1 = require("inflected");
const MetaRepo_1 = __importDefault(require("../storage/MetaRepo"));
exports.Column = (option) => (target, propertyName) => {
    const entityName = inflected_1.pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
    MetaRepo_1.default.pushProperty(entityName, option.type, {
        name: propertyName,
        option,
    });
};
//# sourceMappingURL=Column.js.map