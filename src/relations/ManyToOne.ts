import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

interface IManyToOneOption {
  targetTable: string,
  targetProperty: string,
}

export interface IManyToOne extends IProperty {
  option: IManyToOneOption;
};

export const ManyToOne = (option: IManyToOneOption)  => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1].toLowerCase();
  metaRepo.pushRelation(entityName, 'ManyToOne', {
    name: propertyName,
    option,
  });
}
