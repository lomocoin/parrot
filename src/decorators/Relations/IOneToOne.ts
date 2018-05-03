import { IProperty } from '../IProperty';

export interface IOneToOneOption {
  targetTable: string,
}

export interface IOneToOne extends IProperty {
  option: IOneToOneOption;
};
