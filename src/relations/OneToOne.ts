import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

interface IOneToOneOption {
  targetTable: string,
}

export interface IOneToOne extends IProperty {
  option: IOneToOneOption;
};

export const OneToOne = (option: IOneToOneOption)  => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1].toLowerCase();
  metaRepo.pushRelation(entityName, 'OneToOne', {
    name: propertyName,
    option,
  });
}
