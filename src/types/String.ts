import { pluralize } from 'inflected';
import { IProperty } from './';
import metaRepo from '../storage/MetaRepo';

interface IStringOption {
  limit: [number, number]
}

export interface IStringProperty extends IProperty {
  option: IStringOption;
};

export const String = (option: IStringOption)  => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
  metaRepo.pushProperty(entityName, 'stringProperties', {
    name: propertyName,
    option,
  });
}
