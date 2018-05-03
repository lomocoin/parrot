import { pluralize } from 'inflected';
import metaRepo from '../storage/MetaRepo';
import {
  IPropertyOption,
  propertyTypeEnum,
} from './PropertyTypes';

export const Column = (option: IPropertyOption)  => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());

  metaRepo.pushProperty(entityName, propertyTypeEnum[option.type], {
    name: propertyName,
    option,
  });
}
