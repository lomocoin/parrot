import { IProperty } from '../IProperty';
import { IPropertyOption } from './';
export interface IIntegerOption extends IPropertyOption {
    limit: [number, number];
}
export interface IInteger extends IProperty {
    option: IIntegerOption;
}
