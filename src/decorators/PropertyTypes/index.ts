import { IString, IStringOption } from './IString';
import { IInteger, IIntegerOption } from './IInteger';
import { IDecimal, IDecimalOption } from './IDecimal';
import { IBool, IBoolOption } from './IBool';
import { IEnum, IEnumOption } from './IEnum';

export interface IPropertyOption {
  type: PropertyType;
}
export type PropertyOption = IStringOption | IIntegerOption | IEnumOption | IBoolOption;

export type PropertyType = 'string' | 'integer' | 'decimal' | 'enum' | 'bool'; 

export {
  IString,
  IInteger,
  IDecimal,
  IBool,
  IEnum,
}
