"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const inflected_1 = require("inflected");
const BaseEntity_1 = __importDefault(require("./storage/BaseEntity"));
const MetaRepo_1 = __importDefault(require("./storage/MetaRepo"));
const getRandomString_1 = __importDefault(require("./utils/getRandomString"));
const getRandomNumber_1 = __importDefault(require("./utils/getRandomNumber"));
const getRandomBoolean_1 = __importDefault(require("./utils/getRandomBoolean"));
const getRandom_1 = __importDefault(require("./utils/getRandom"));
const getRandomDate_1 = __importDefault(require("./utils/getRandomDate"));
const applyMixins_1 = __importDefault(require("./utils/applyMixins"));
const log_1 = __importDefault(require("./utils/log"));
exports.Entity = (recordCount) => (constructor) => {
    const EntityName = inflected_1.pluralize(constructor.toString().split(' ')[1].toLowerCase());
    class EntityInstance extends constructor {
        constructor(...args) {
            super(...args);
            const [basePath] = args;
            log_1.default.debug(args);
            log_1.default.debug(basePath);
            MetaRepo_1.default.getMeta(EntityName, 'string')
                .forEach(({ name, option }) => {
                this[name] = args[name] || getRandomString_1.default(option);
            });
            MetaRepo_1.default.getMeta(EntityName, 'integer')
                .forEach(({ name, option }) => {
                this[name] = args[name] || getRandomNumber_1.default(option);
            });
            MetaRepo_1.default.getMeta(EntityName, 'decimal')
                .forEach(({ name, option }) => {
                // because of getRandomNumber will reture number in collection of (min, max],
                // but in decimal mode we want (min, max)
                const int = getRandomNumber_1.default(option) - 1;
                const decimal = Math.random().toFixed(option.precition);
                this[name] = args[name] || Number.parseFloat([int, decimal].join('.'));
            });
            MetaRepo_1.default.getMeta(EntityName, 'bool')
                .forEach(({ name, option }) => {
                this[name] = args[name] || ((option && option.value) ? option.value : getRandomBoolean_1.default());
            });
            MetaRepo_1.default.getMeta(EntityName, 'enum')
                .forEach(({ name, option }) => {
                const enums = option.target instanceof Array ? option : require(path_1.resolve('.', path_1.dirname(basePath), option.target));
                this[name] = args[name] || getRandom_1.default(enums);
            });
            MetaRepo_1.default.getMeta(EntityName, 'date')
                .forEach(({ name, option }) => {
                const randomDate = getRandomDate_1.default(option.format, option.start, option.end);
                if (args[name]) {
                    this[name] = args[name];
                }
                else if (!option.display || option.display === 'date') {
                    this[name] = randomDate.toDate();
                }
                else if (option.display === 'string') {
                    this[name] = randomDate.format(option.format);
                }
                else {
                    this[name] = randomDate.valueOf();
                }
            });
            this.id = BaseEntity_1.default.nextVal();
            this.createdAt = new Date().getTime();
        }
        static nextVal() {
            return EntityInstance.sequence++;
        }
    }
    EntityInstance.sequence = 1;
    EntityInstance.EntityName = EntityName;
    EntityInstance.recordCount = recordCount || 1;
    applyMixins_1.default(EntityInstance, [BaseEntity_1.default]);
    return EntityInstance;
};
//# sourceMappingURL=Entity.js.map