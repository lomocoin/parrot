import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

interface INumberOption extends IPropertyOption {
  limit: [number, number]
}

export interface INumber extends IProperty {
  option: INumberOption;
};
