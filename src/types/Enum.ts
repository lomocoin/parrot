import { pluralize } from 'inflected';
import { IProperty } from './';
import metaRepo from '../storage/MetaRepo';

export interface IEnumProperty extends IProperty {
  option: string | any[];
};

export const Enum = (option: any[] | string) => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
  metaRepo.pushProperty(entityName, 'enumProperties', {
    name: propertyName,
    option,
  });
} 
