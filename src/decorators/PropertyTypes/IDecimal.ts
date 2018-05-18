import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

export interface IDecimalOption extends IPropertyOption {
  limit: [number, number];
  precition: number;
}

export interface IDecimal extends IProperty {
  option: IDecimalOption;
};
