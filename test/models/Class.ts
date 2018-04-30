import path from 'path';
import { Entity } from '../../src/Entity';
import { Number, String, Bool, Enum } from '../../src/types';
import { OneToMany } from '../../src/relations';
import Student from './Student';

@Entity
export default class Class {
  @Enum(['One', 'Two', 'Three', 'Four'])
  name: string;

  @Enum(path.resolve(__dirname, '../source/location.json'))
  location: { floor: number, room: number };

  @OneToMany({
    targetTable: 'Student'
  })
  students: Student[];
}
