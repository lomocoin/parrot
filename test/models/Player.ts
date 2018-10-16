import { Entity, Column } from '../../dist/index';

@Entity(5)
class Player {
  @Column({
    type: 'enum',
    target: './name',
  })
  name: string;

  @Column({
    type: 'enum',
    target: ['male', 'female'],
  })
  gender: string;

  @Column({
    type: 'bool',
  })
  master: boolean;

  @Column({
    type: 'integer',
    limit: [13, 100],
  })
  age: number;

  @Column({
    type: 'decimal',
    limit: 100,
    precition: 2,
  })
  hitPoint: number;

  @Column({
    type: 'decimal',
    limit: 100,
    precition: 3,
  })
  skillPoint: number;
}

export default Player;
