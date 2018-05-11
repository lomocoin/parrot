import { resolve, dirname } from 'path';
import { pluralize } from 'inflected';
import BaseEntity from './storage/BaseEntity';
import {
  IString,
  IInteger,
  IDecimal,
  IBool,
  IEnum,
} from './decorators/PropertyTypes';
import metaRepo from './storage/MetaRepo';
import getRandomString from './utils/getRandomString';
import getRandomNumber from './utils/getRandomNumber';
import getRandomBoolean from './utils/getRandomBoolean';
import getRandom from './utils/getRandom';
import applyMixins from './utils/applyMixins';

export interface MetaEntity {
  string: IString[];
  number: IInteger[];
  bool: IBool[];
  enum: IEnum[];
}

export interface IEntityInstance { new(...args: any[]): any }

export const Entity = (constructor: IEntityInstance): IEntityInstance => {
  const EntityName = pluralize(constructor.toString().split(' ')[1].toLowerCase());
 class EntityInstance extends constructor implements BaseEntity {
    constructor(...args: any[]) {
      super(...args);
      const [config, basePath] = args;
      metaRepo.getMeta(EntityName, 'string')!
        .forEach(({ name, option }: IString) => {
          (this as any)[name] = (args as any)[name] || getRandomString(option);
        });
      metaRepo.getMeta(EntityName, 'integer')!
        .forEach(({ name, option }: IInteger) => {
          (this as any)[name] = (args as any)[name] || getRandomNumber(option);
        });
      metaRepo.getMeta(EntityName, 'decimal')!
        .forEach(({ name, option }: IDecimal) => {
          // because of getRandomNumber will reture number in collection of (min, max],
          // but in decimal mode we want (min, max)
          const int = getRandomNumber(option) - 1;
          const decimal = Math.random().toFixed(option.precition);
          (this as any)[name] = (args as any)[name] || Number.parseFloat([int, decimal].join('.'));
        });
      metaRepo.getMeta(EntityName, 'bool')!
        .forEach(({ name, option }: IBool) => {
          (this as any)[name] = (args as any)[name] || ((option && option.value) ? option.value : getRandomBoolean());
        });
      metaRepo.getMeta(EntityName, 'enum')!
        .forEach(({ name, option }: IEnum) => {
          const enums = option.target instanceof Array ? option : require(resolve('.', dirname(basePath), (option.target as string)));
          (this as any)[name] = (args as any)[name] || getRandom(enums);
        });
      
      this.id = BaseEntity.nextVal();
      this.createdAt = new Date().getTime();
    }

    static sequence: number = 1;
    static EntityName: string = EntityName;

    static nextVal() {
      return EntityInstance.sequence ++;
    }
  
    id: number;
    createdAt: number;
  }

  applyMixins(EntityInstance, [BaseEntity]);

  return EntityInstance;
}
