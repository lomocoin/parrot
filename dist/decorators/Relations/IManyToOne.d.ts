import { IProperty } from '../IProperty';
export interface IManyToOneOption {
    target: string;
    targetProperty: string;
}
export interface IManyToOne extends IProperty {
    option: IManyToOneOption;
}
