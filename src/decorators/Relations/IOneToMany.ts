import { IProperty } from '../IProperty';

export interface IOneToManyOption {
  target: string,
}

export interface IOneToMany extends IProperty {
  option: IOneToManyOption;
};
