import {
  IString,
  INumber,
  IBool,
  IEnum,
} from '../decorators/PropertyTypes';
import {
  IManyToOne,
  IOneToMany,
  IOneToOne,
} from '../decorators/Relations';

export default class MetaEntity extends Map<string, Set<any>> {
  constructor() {
    super();
    this.set('string', new Set<IString>())
    this.set('number', new Set<INumber>())
    this.set('bool', new Set<IBool>())
    this.set('enum', new Set<IEnum>())
    this.set('OneToMany', new Set<IOneToMany>())
    this.set('ManyToOne', new Set<IManyToOne>())
    this.set('OneToOne', new Set<IOneToOne>())
  }
}
