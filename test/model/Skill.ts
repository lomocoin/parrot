import { Entity, Column } from '../../src/index';

@Entity(10)
class Skill {
  @Column({
    type: 'string',
    limit: [5, 12],
  })
  name: string;

  @Column({
    type: 'decimal',
    limit: 20,
    precition: 2,
  })
  damage: number;

  @Column({
    type: 'decimal',
    limit: 10,
    precition: 2,
  })
  cost: number;
}

export default Skill;
