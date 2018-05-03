import { IProperty } from '../IProperty';

export interface IManyToOneOption {
  targetTable: string,
  targetProperty: string,
}

export interface IManyToOne extends IProperty {
  option: IManyToOneOption;
};
