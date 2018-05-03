import { IProperty } from '../IProperty';

export interface IOneToManyOption {
  targetTable: string,
}

export interface IOneToMany extends IProperty {
  option: IOneToManyOption;
};
