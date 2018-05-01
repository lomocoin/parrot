import { pluralize } from 'inflected';
import { IProperty } from './';
import metaRepo from '../storage/MetaRepo';

interface INumberOption {
  limit: [number, number]
}

export interface INumberProperty extends IProperty {
  option: INumberOption;
};

export const Number = (option: INumberOption)  => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
  metaRepo.pushProperty(entityName, 'numberProperties', {
    name: propertyName,
    option,
  });
}
