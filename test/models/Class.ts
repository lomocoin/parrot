import path from 'path';
import { Entity } from '../../src/Entity';
import { Column } from '../../src/decorators/Column';
import { OneToMany } from '../../src/decorators/Relation';
import Student from './Student';

@Entity
export default class Class {
  @Column({
    type: 'enum',
    target: ['One', 'Two', 'Three', 'Four'],
  })
  name: string;

  @Column({
    type: 'enum',
    target: path.resolve(__dirname, '../source/location.json'),
  })
  location: { floor: number, room: number };

  @OneToMany({
    targetTable: 'Student'
  })
  students: Student[];
}
