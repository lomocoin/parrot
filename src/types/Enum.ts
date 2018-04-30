import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

export interface IEnumProperty extends IProperty {
  option: string | any[];
};

export const Enum = (option: any[] | string) => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1];
  metaRepo.pushProperty(entityName, 'enumProperties', {
    name: propertyName,
    option,
  });
} 
