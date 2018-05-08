import { Entity, Column } from '../../src';

@Entity
export default class TodoExtra {
  @Column({
    type: 'string',
    limit: 50,
  })
  documentPath: string;

  @Column({
    type: 'string',
    limit: 50,
  })
  photoPath: string;
}
