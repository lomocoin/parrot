import {
  IStringProperty,
  INumberProperty,
  IBoolProperty,
  IEnumProperty,
} from '../types/index';
import {
  IManyToOne,
  IOneToMany,
  IOneToOne,
} from '../relations/index';

class MetaEntity extends Map<string, Set<any>> {
  constructor() {
    super();
    this.set('stringProperties', new Set<IStringProperty>())
    this.set('numberProperties', new Set<INumberProperty>())
    this.set('boolProperties', new Set<IBoolProperty>())
    this.set('enumProperties', new Set<IEnumProperty>())
    this.set('OneToMany', new Set<IOneToMany>())
    this.set('ManyToOne', new Set<IManyToOne>())
    this.set('OneToOne', new Set<IOneToOne>())
  }
}

type PropertyType = 'stringProperties' | 'numberProperties' | 'boolProperties' | 'enumProperties';

type RelationType = 'ManyToOne' | 'OneToMany' | 'OneToOne';

class MetaRepo extends Map<string, MetaEntity> {
  pushProperty(entityName: string, type: PropertyType, property: IStringProperty | INumberProperty | IBoolProperty | IEnumProperty): void {
    if (!this.has(entityName)) this.set(entityName, new MetaEntity());
    const repo = this.get(entityName)!.get(type)!.add(property);
  };
  getMeta(entityName: string, type: PropertyType| RelationType): any[] | undefined {
    if (!this.has(entityName)) return [];
    return [...(this.get(entityName)!.get(type) || [])];
  };
  pushRelation(entityName: string, type: RelationType, relation: IManyToOne | IOneToMany | IOneToOne): void {
    if (!this.has(entityName)) this.set(entityName, new MetaEntity())
    const repo = this.get(entityName)!.get(type)!.add(relation);
  }
}

export default new MetaRepo();
