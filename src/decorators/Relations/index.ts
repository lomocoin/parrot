import { IManyToOne, IManyToOneOption } from './IManyToOne';
import { IOneToMany, IOneToManyOption } from './IOneToMany';
import { IOneToOne, IOneToOneOption } from './IOneToOne';

export type RelationOption = IManyToOneOption | IOneToManyOption | IOneToOneOption;
export type RelationType = 'ManyToOne' | 'OneToMany' | 'OneToOne'; 

export {
  IManyToOne,
  IOneToMany,
  IOneToOne,
}
