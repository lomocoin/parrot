import { IManyToOne, IManyToOneOption } from './IManyToOne';
import { IOneToMany, IOneToManyOption } from './IOneToMany';
import { IOneToOne, IOneToOneOption } from './IOneToOne';
import { IManyToMany, IManyToManyOption } from './IManyToMany';

export type RelationOption = IManyToOneOption | IOneToManyOption | IOneToOneOption | IManyToManyOption;
export type RelationType = 'ManyToOne' | 'OneToMany' | 'OneToOne' | 'ManyToMany'; 

export {
  IManyToOne,
  IOneToMany,
  IOneToOne,
  IManyToMany,
}
