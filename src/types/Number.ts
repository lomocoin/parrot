import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

interface INumberOption {
  low: number,
  high: number
}

export interface INumberProperty extends IProperty {
  option: INumberOption;
};

export const Number = (option: INumberOption)  => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1].toLowerCase();
  metaRepo.pushProperty(entityName, 'numberProperties', {
    name: propertyName,
    option,
  });
}
