import getRandomString from '../src/utils/getRandomString';
import getRandomNumber from '../src/utils/getRandomNumber';
import getRandomBoolean from '../src/utils/getRandomBoolean';
import getRandom from '../src/utils/getRandom';
import applyMixins from '../src/utils/applyMixins';
import splitPath from '../src/utils/splitPath';

describe('getRandomNumber', () => {
  test('should get a random number between limits', () => {
    const num = getRandomNumber({ limit: [5, 20]});
    expect(num).toBeLessThanOrEqual(20)
    expect(num).toBeGreaterThanOrEqual(5);
  });
  test('should get a random number between 0 to limit', () => {
    const num = getRandomNumber({ limit: 20});
    expect(num).toBeLessThanOrEqual(20)
    expect(num).toBeGreaterThanOrEqual(0);
  });
});


describe('getRandomString', () => {
  test('should get a random string length between limits', () => {
    const str = getRandomString({ limit: [5, 20] });
    expect(str).toMatch(/\w*/)
    expect(str.length).toBeLessThanOrEqual(20)
    expect(str.length).toBeGreaterThanOrEqual(5);
  });
  test('should get a random string length between 0 to limit', () => {
    const str = getRandomString({ limit: 20 });
    expect(str).toMatch(/\w*/)
    expect(str.length).toBeLessThanOrEqual(20)
    expect(str.length).toBeGreaterThanOrEqual(0);
  });
});

describe('getRandomBoolean', () => {
  test('should get a random bool', () => {
    const bool = getRandomBoolean();
    expect(typeof bool).toBe('boolean');
  });
});

describe('getRandom', () => {
  test('should get a random value from param array', () => {
    const stringSrouce = ['AAAA', 'BBBB', 'CCCC'];
    const string = getRandom(stringSrouce)
    expect(stringSrouce).toContain(string);
    const objectSouce = [{
      level: 1,
      name: 'Tanis'
    }, {
      level: 2,
      name: 'Raistlin'
    }, {
      level: 1,
      name: 'Huma'
    }];
    const player = getRandom(objectSouce);
    expect(objectSouce).toContain(player);
  })
});

describe('applyMixins', () => {
  test('should have both class methods after mixins', () => {
    class Dog {
      woof() {
        return 'Woof!';
      }
    }

    class Bird {
      fly() {
        return 'Flying';
      }
    }

    class Monster {
      woof() {}
      fly() {}
    }

    applyMixins(Monster, [Dog, Bird]);

    const monster = new Monster();

    expect(monster.woof()).toBe('Woof!');
    expect(monster.fly()).toBe('Flying');
  })
});

describe('splitPath', () => {
  test('should get a [resource, id] array from a rest path', () => {
    const path = '/classes/1/students/2';
    expect(splitPath(path)).toMatchObject([
      ['classes', '1'],
      ['students', '2'],
    ])
  })
});
