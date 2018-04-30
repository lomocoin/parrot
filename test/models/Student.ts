import { Entity } from '../../src/Entity';
import { Number, String, Bool, Enum } from '../../src/types';

@Entity
export default class Student {
  @String({ start: 6, length: 10 })
  name: string;

  @Number({ low: 6, high: 12 })
  age: string;
}
