import { Entity, Column } from '../../dist';

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
