import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

interface IBoolOption extends IPropertyOption {
  value?: boolean;
}

export interface IBool extends IProperty {
  option: IBoolOption;
}
