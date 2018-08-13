import { IProperty } from '../IProperty';
import { IPropertyOption } from './';
export declare type DateDisplayType = 'timestamp' | 'string' | 'date';
export interface IDateOption extends IPropertyOption {
    format: string;
    start?: string;
    end?: string;
    display?: DateDisplayType;
}
export interface IDate extends IProperty {
    option: IDateOption;
}
