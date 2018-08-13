"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const inflected_1 = require("inflected");
const Repository_1 = __importDefault(require("./storage/Repository"));
const MetaRepo_1 = __importDefault(require("./storage/MetaRepo"));
class DataBase extends Map {
    constructor(models, config) {
        super();
        // create repositorys and first record
        models.forEach(({ name, path }) => {
            const Entity = require(path).default;
            const record = new Entity(config, path);
            const repository = new Repository_1.default(Entity);
            repository.insert(record);
            this.set(name.replace(`${path_1.dirname(name)}/`, ''), repository);
        });
        models.forEach(({ name }) => {
            // mapping OneToMany
            (MetaRepo_1.default.getMeta(name, 'OneToMany') || []).map(({ name: propertyName, option }) => {
                const repository = this.get(name);
                const source = repository.select();
                source.forEach((record, index) => {
                    repository.update(record.id, {
                        [propertyName]: this.get(inflected_1.pluralize(option.target.toLowerCase())).select((r, i) => i % source.length === index),
                    });
                });
            });
            // mapping ManyToOne
            (MetaRepo_1.default.getMeta(name, 'ManyToOne') || []).map(({ name: propertyName, option }) => {
                const repository = this.get(name);
                const source = repository.select();
                source.forEach((record, index) => {
                    repository.update(record.id, {
                        [propertyName]: this.get(inflected_1.pluralize(option.target.toLowerCase())).selectOne((r) => r[option.targetProperty] === record.id)
                    });
                });
            });
            // mapping OneToOne
            (MetaRepo_1.default.getMeta(name, 'OneToOne') || []).map(({ name: propertyName, option }) => {
                const repository = this.get(name);
                const source = repository.select();
                source.forEach((record, index) => {
                    repository.update(record.id, {
                        [propertyName]: this.get(inflected_1.pluralize(option.target.toLowerCase())).select((r, i) => i === index)
                    });
                });
            });
            // mapping ManyToMany
            (MetaRepo_1.default.getMeta(name, 'ManyToMany') || []).map(({ name: propertyName, option }) => {
                const repository = this.get(name);
                const source = repository.select();
                source.forEach((record, index) => {
                    repository.update(record.id, {
                        [propertyName]: this.get(inflected_1.pluralize(option.target.toLowerCase())).select((r, i) => index % (i + 1) === 0)
                    });
                });
            });
        });
    }
}
exports.default = DataBase;
;
//# sourceMappingURL=DataBase.js.map