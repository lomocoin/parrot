import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

export interface IBoolOption extends IPropertyOption {
  value?: boolean;
}

export interface IBool extends IProperty {
  option: IBoolOption;
}
