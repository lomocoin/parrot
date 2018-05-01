import { IProperty } from '../Entity';
import metaRepo from '../storage/MetaRepo';

interface IOneToManyOption {
  targetTable: string,
}

export interface IOneToMany extends IProperty {
  option: IOneToManyOption;
};

export const OneToMany = (option: IOneToManyOption)  => (target: any, propertyName: string) => {
  const entityName = target.constructor.toString().split(' ')[1].toLowerCase();
  metaRepo.pushRelation(entityName, 'OneToMany', {
    name: propertyName,
    option,
  });
}
