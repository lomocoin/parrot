import { IProperty } from '../IProperty';
export interface IOneToOneOption {
    target: string;
}
export interface IOneToOne extends IProperty {
    option: IOneToOneOption;
}
