import {
  IString,
  IInteger,
  IDecimal,
  IBool,
  IEnum,
  PropertyType,
  IDate,
} from '../decorators/PropertyTypes/index';
import {
  IManyToOne,
  IOneToMany,
  IOneToOne,
  IManyToMany,
  RelationType,
} from '../decorators/Relations';
import MetaEntity from './MetaEntity';

export class MetaRepo extends Map<string, MetaEntity> {
  pushProperty(entityName: string, type: PropertyType, property: IString | IInteger | IDecimal | IBool | IEnum | IDate): void {
    if (!this.has(entityName)) {
      this.set(entityName, new MetaEntity());
    }
    this.get(entityName)!.get(type)!.add(property);
  };
  getMeta(entityName: string, type: PropertyType | RelationType): any[] | undefined {
    if (!this.has(entityName)) {
      return [];
    }
    return [...(this.get(entityName)!.get(type) || [])];
  };
  pushRelation(entityName: string, type: RelationType, relation: IManyToOne | IOneToMany | IOneToOne | IManyToMany): void {
    if (!this.has(entityName)) {
      this.set(entityName, new MetaEntity())
    }
    this.get(entityName)!.get(type)!.add(relation);
  }
}

export default new MetaRepo();
