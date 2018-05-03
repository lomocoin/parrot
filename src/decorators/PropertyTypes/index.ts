import { IString } from './IString';
import { INumber } from './INumber';
import { IBool } from './IBool';
import { IEnum } from './IEnum';

export type PropertyType = 'bool' | 'enum' | 'number' | 'string';
export interface IPropertyOption {
  type: PropertyType;
}

export {
  IString,
  INumber,
  IBool,
  IEnum,
}

export enum propertyTypeEnum {
  string = 'string',
  number = 'number',
  enum = 'enum',
  bool = 'bool',
};
