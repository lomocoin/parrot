import { pluralize } from 'inflected';
import metaRepo from '../storage/MetaRepo';
import { PropertyOption } from './PropertyTypes';


export const Column = (option: PropertyOption)  => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());

  metaRepo.pushProperty(entityName, option.type, {
    name: propertyName,
    option,
  });
}
