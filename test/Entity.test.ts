import BaseEntity from '../src/storage/BaseEntity';
import { Entity, IEntityInstance } from '../src/Entity';
import Player from './model/Player';
import Skill from './model/Skill';
import Food from './model/Food';

describe("Entity", () => {

  const config = {

  }

  test("Entity should be a instance of IEntityInstance", () => {
    const player = new Player();
  })
});
