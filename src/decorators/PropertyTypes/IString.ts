import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

export interface IStringOption extends IPropertyOption {
  limit: [number, number]
}

export interface IString extends IProperty {
  option: IStringOption;
};
