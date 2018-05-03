import { Entity } from '../../src/Entity';
import { Column } from '../../src/decorators/Column';

@Entity
export default class Student {
  @Column({
    type: 'string',
    limit: [6, 10],
  })
  name: string;

  @Column({
    type: 'number',
    limit: [6, 12]
  })
  age: string;
}
