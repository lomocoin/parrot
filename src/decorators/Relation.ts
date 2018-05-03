import { pluralize } from 'inflected';
import metaRepo from '../storage/MetaRepo';
import { IRelationOption, RelationType, RelationTypeEnum } from './Relations';

const Relation = (type: RelationType) => (option: IRelationOption)  => (target: any, propertyName: string) => {
  const entityName = pluralize(target.constructor.toString().split(' ')[1].toLowerCase());
  metaRepo.pushRelation(entityName, RelationTypeEnum[type], {
    name: propertyName,
    option,
  });
}

export const ManyToOne = Relation('ManyToOne');
export const OneToMany = Relation('OneToMany');
export const OneToOne = Relation('OneToOne');
