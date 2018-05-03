import { pluralize } from 'inflected';
import BaseEntity from './storage/BaseEntity';
import {
  IString,
  INumber,
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
  number: INumber[];
  bool: IBool[];
  enum: IEnum[];
}

export const Entity = <T extends {new(...args:any[]):{}}>(constructor: T) => {
  class Instance extends constructor implements BaseEntity{
    constructor(...args: any[]) {
      super(...args);
      const entityName = pluralize(constructor.toString().split(' ')[1].toLowerCase());
      metaRepo.getMeta(entityName, 'string')!
        .forEach(({ name, option }: IString) => {
          (this as any)[name] = getRandomString(option);
        });
      metaRepo.getMeta(entityName, 'number')!
        .forEach(({ name, option }: INumber) => {
          (this as any)[name] = getRandomNumber(option);
        });
      metaRepo.getMeta(entityName, 'bool')!
        .forEach(({ name, option }: IBool) => {
          (this as any)[name] = (option && option.value) ? option.value : getRandomBoolean();
        });
      metaRepo.getMeta(entityName, 'enum')!
        .forEach(({ name, option }: IEnum) => {
          const enums = option.target instanceof Array ? option : require((option.target as string));
          (this as any)[name] = getRandom(enums);
        });
      
      this.id = BaseEntity.nextVal();
      this.createdAt = new Date().getTime();
    }

    protected static sequence: number = 1;

    static nextVal() {
      return Instance.sequence ++;
    }
  
    id: number;
    createdAt: number;
  }

  applyMixins(Instance, [BaseEntity]);

  return Instance;
}
