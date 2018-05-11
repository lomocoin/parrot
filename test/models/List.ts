import { Entity, Column, OneToMany } from '../../dist';
import Todo from './Todo';

@Entity
export default class List {
  @Column({
    type: 'string',
    limit: [2, 20],
  })
  title: string;

  @OneToMany({
    target: 'Todo',
  })
  todos: Todo[];
}
