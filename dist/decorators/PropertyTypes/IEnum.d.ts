import { IProperty } from '../IProperty';
import { IPropertyOption } from './';
export interface IEnumOption extends IPropertyOption {
    target: string | any[];
}
export interface IEnum extends IProperty {
    option: IEnumOption;
}
