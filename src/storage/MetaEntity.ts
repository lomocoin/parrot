import {
  IString,
  IInteger,
  IBool,
  IEnum,
  IDecimal,
  IDate,
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
    this.set('integer', new Set<IInteger>())
    this.set('decimal', new Set<IDecimal>())
    this.set('date', new Set<IDate>())
    this.set('bool', new Set<IBool>())
    this.set('enum', new Set<IEnum>())
    this.set('OneToMany', new Set<IOneToMany>())
    this.set('ManyToOne', new Set<IManyToOne>())
    this.set('OneToOne', new Set<IOneToOne>())
  }
}
