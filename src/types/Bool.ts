import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

interface IBoolOption {
  value: boolean;
}

export interface IBoolProperty extends IProperty {
  option?: IBoolOption;
};

export const Bool = (option?: IBoolOption)  => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1];
  metaRepo.pushProperty(entityName, 'boolProperties', {
    name: propertyName,
    option,
  });
}
