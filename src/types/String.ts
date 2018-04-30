import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

interface IStringOption {
  start: number,
  length: number
}

export interface IStringProperty extends IProperty {
  option: IStringOption;
};

export const String = (option: IStringOption)  => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1].toLowerCase();
  metaRepo.pushProperty(entityName, 'stringProperties', {
    name: propertyName,
    option,
  });
}