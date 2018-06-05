import { IProperty } from '../IProperty';
import { IPropertyOption } from './';

export interface IImageOption extends IPropertyOption {
  width: number,
  height: number,
};

export interface IImage extends IProperty {
  option: IImageOption;
};
