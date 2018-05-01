import { pluralize } from 'inflected';
import { IProperty } from '../types';
import metaRepo from '../storage/MetaRepo';

interface IOneToOneOption {
  targetTable: string,
}

export interface IOneToOne extends IProperty {
  option: IOneToOneOption;
};

export const OneToOne = (option: IOneToOneOption)  => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
  metaRepo.pushRelation(entityName, 'OneToOne', {
    name: propertyName,
    option,
  });
}
