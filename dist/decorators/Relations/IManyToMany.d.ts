import { IProperty } from '../IProperty';
export interface IManyToManyOption {
    target: string;
}
export interface IManyToMany extends IProperty {
    option: IManyToManyOption;
}
