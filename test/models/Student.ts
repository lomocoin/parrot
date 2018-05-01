import { Entity } from '../../src/Entity';
import { Number, String, Bool, Enum } from '../../src/types';

@Entity
export default class Student {
  @String({ limit: [6, 10] })
  name: string;

  @Number({ limit: [6, 12] })
  age: string;
}
