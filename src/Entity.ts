import { pluralize } from 'inflected';
import BaseEntity from './storage/BaseEntity';
import {
  IStringProperty,
  INumberProperty,
  IBoolProperty,
  IEnumProperty,
} from './types/index';
import metaRepo from './storage/MetaRepo';
import getRandomString from './utils/getRandomString';
import getRandomNumber from './utils/getRandomNumber';
import getRandomBoolean from './utils/getRandomBoolean';
import getRandom from './utils/getRandom';
import applyMixins from './utils/applyMixins';

interface IMetaEntityConstructor {
  new(...args: any[]): MetaEntity;
}

export class MetaEntity {
  stringProperties: IStringProperty[];
  numberProperties: INumberProperty[];
  boolProperties: IBoolProperty[];
  enumProperties: IEnumProperty[];
}

export const Entity = <T extends {new(...args:any[]):{}}>(constructor: T) => {
  class Instance extends constructor implements BaseEntity{
    constructor(...args: any[]) {
      super(...args);
      const entityName = pluralize(constructor.toString().split(' ')[1].toLowerCase());
      metaRepo.getMeta(entityName, 'stringProperties')!
        .forEach(({ name, option }: IStringProperty) => {
          (this as any)[name] = getRandomString(option);
        });
      metaRepo.getMeta(entityName, 'numberProperties')!
        .forEach(({ name, option }: INumberProperty) => {
          (this as any)[name] = getRandomNumber(option);
        });
      metaRepo.getMeta(entityName, 'boolProperties')!
        .forEach(({ name, option }: IBoolProperty) => {
          (this as any)[name] = (option && option.value) ? option.value : getRandomBoolean();
        });
      metaRepo.getMeta(entityName, 'enumProperties')!
        .forEach(({ name, option }: IEnumProperty) => {
          const enums = option instanceof Array ? option : require(option);
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
