import { IString, IStringOption } from './IString';
import { INumber, INumberOption } from './INumber';
import { IBool, IBoolOption } from './IBool';
import { IEnum, IEnumOption } from './IEnum';

export interface IPropertyOption {
  type: PropertyType;
}
export type PropertyOption = IStringOption | INumberOption | IEnumOption | IBoolOption;

export type PropertyType = 'string' | 'number' | 'enum' | 'bool'; 

export {
  IString,
  INumber,
  IBool,
  IEnum,
}
