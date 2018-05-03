import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

interface EnumOption extends IPropertyOption {
  target: string | any[];
}

export interface IEnum extends IProperty {
  option: EnumOption;
};
