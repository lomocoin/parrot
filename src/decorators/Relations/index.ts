import { IManyToOne, IManyToOneOption } from './IManyToOne';
import { IOneToMany, IOneToManyOption } from './IOneToMany';
import { IOneToOne, IOneToOneOption } from './IOneToOne';

export type RelationType = 'ManyToOne' | 'OneToMany' | 'OneToOne';
export type IRelationOption = IManyToOneOption | IOneToManyOption | IOneToOneOption;

export {
  IManyToOne,
  IOneToMany,
  IOneToOne,
}

export enum RelationTypeEnum {
  ManyToOne = 'ManyToOne',
  OneToMany = 'OneToMany',
  OneToOne = 'OneToOne',
};
