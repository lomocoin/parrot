import {
  IString,
  INumber,
  IBool,
  IEnum,
  PropertyType,
} from '../decorators/PropertyTypes/index';
import {
  IManyToOne,
  IOneToMany,
  IOneToOne,
  RelationType
} from '../decorators/Relations';
import MetaEntity from './MetaEntity';

class MetaRepo extends Map<string, MetaEntity> {
  pushProperty(entityName: string, type: PropertyType, property: IString | INumber | IBool | IEnum): void {
    if (!this.has(entityName)) {
      this.set(entityName, new MetaEntity());
    }
    const repo = this.get(entityName)!.get(type)!.add(property);
  };
  getMeta(entityName: string, type: PropertyType | RelationType): any[] | undefined {
    if (!this.has(entityName)) {
      return [];
    }
    return [...(this.get(entityName)!.get(type) || [])];
  };
  pushRelation(entityName: string, type: RelationType, relation: IManyToOne | IOneToMany | IOneToOne): void {
    if (!this.has(entityName)) {
      this.set(entityName, new MetaEntity())
    }
    const repo = this.get(entityName)!.get(type)!.add(relation);
  }
}

export default new MetaRepo();
