import { IString, IStringOption } from './IString';
import { IInteger, IIntegerOption } from './IInteger';
import { IDecimal, IDecimalOption } from './IDecimal';
import { IBool, IBoolOption } from './IBool';
import { IEnum, IEnumOption } from './IEnum';
import { IDate, IDateOption, DateDisplayType } from './IDate';
export interface IPropertyOption {
    type: PropertyType;
}
export declare type PropertyOption = IStringOption | IIntegerOption | IEnumOption | IBoolOption | IDateOption | IDecimalOption;
export declare type PropertyType = 'string' | 'integer' | 'decimal' | 'enum' | 'bool' | 'date';
export { IString, IInteger, IDecimal, IBool, IEnum, IDate, DateDisplayType };
