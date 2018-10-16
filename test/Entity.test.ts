import { resolve } from 'path';
import Player from './models/Player';
import Skill from './models/Skill';
import Food from './models/Food';
import config from './config';

describe("Entity", () => {
  test("entityInstance should be a instance of entityClass", () => {
    const player = new Player(config, resolve(__dirname, 'models/Player.ts'));
    const skill = new Skill(config, resolve(__dirname, 'models/Skill.ts'));
    const food = new Food(config, resolve(__dirname, 'models/Food.ts'));
    expect(player instanceof Player).toBe(true)
    expect(skill instanceof Skill).toBe(true)
    expect(food instanceof Food).toBe(true)
  });
});
