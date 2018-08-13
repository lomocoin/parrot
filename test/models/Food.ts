import { Column, Entity } from '../../dist/index';

@Entity(5)
class Food {
  @Column({
    type: 'string',
    limit: [8, 20],
  })
  name: string;

  @Column({
    type: 'date',
  })
  expirationTime: number;
}

export default Food;
