import { Entity, Column, OneToOne } from '../../src';
import TodoExtra from './TodoExtra';

@Entity
export default class Todo {
  @Column({
    type: 'string',
    limit: [2, 20],
  })
  title: string;

  @Column({
    type: 'string',
    limit: [2, 200],
  })
  content: string;

  @OneToOne({
    target: 'TodoExtra'
  })
  extra: TodoExtra;

  @Column({
    type: 'enum',
    target: '../source/tags.json',
  })
  tags: string;
}
