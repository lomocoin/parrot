import { IString, IStringOption } from './IString';
import { IInteger, IIntegerOption } from './IInteger';
import { IDecimal, IDecimalOption } from './IDecimal';
import { IBool, IBoolOption } from './IBool';
import { IEnum, IEnumOption } from './IEnum';
import { IDate, IDateOption, DateDisplayType } from './IDate';
import { IImage, IImageOption } from './IImage';

export interface IPropertyOption {
  type: PropertyType;
}
export type PropertyOption = IStringOption | IIntegerOption | IEnumOption | IBoolOption | IDateOption | IImageOption;

export type PropertyType = 'string' | 'integer' | 'decimal' | 'enum' | 'bool' | 'date' | 'image'; 

export {
  IString,
  IInteger,
  IDecimal,
  IBool,
  IEnum,
  IDate,
  IImage,
  DateDisplayType,
}
