import moment from 'moment';
import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import getRandomString from '../src/utils/getRandomString';
import getRandomNumber from '../src/utils/getRandomNumber';
import getRandomBoolean from '../src/utils/getRandomBoolean';
import getRandom from '../src/utils/getRandom';
import getRandomDate from '../src/utils/getRandomDate';
import getRandomImage from '../src/utils/getRandomImage';
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
    const str = getRandomString({ limit: 200 });
    expect(str).toMatch(/\w*/)
    expect(str.length).toBeLessThanOrEqual(200)
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
  });
});

describe('getRandomDate', () => {
  test('should get a moment instance of random date', () => {
    const m = getRandomDate();
    expect(moment.isMoment(m)).toBe(true);
  });
  test('should get a moment instance between startTime and endTime', () => {
    const m = getRandomDate('YYYY-MM-DD', '2018-05-01', '2018-05-31');
    expect(m.isBetween('2018-04-30', '2018-06-01')).toBe(true);
  });
  test('should get random date between 1970-01-01 and endTime if startTime is null', () => {
    const m = getRandomDate('YYYY-MM-DD', null, '2018-05-31');
    expect(m.isBetween('1970-01-01', '2018-05-31')).toBe(true);
  });
  test('should get random date between startTime and now if endTime is null', () => {
    const m = getRandomDate('YYYY-MM-DD', '2018-05-01');
    expect(m.isBetween('1970-05-01', moment())).toBe(true);
  });
});

describe('getRandomImage', () => {
  test('should save a image to a given path', () => {
    const imagePath = './test';
    const fileName = getRandomImage({ width: 300, height: 300, imagePath });
    const exist = fs.existsSync(path.resolve(imagePath, fileName));
    expect(exist).toBe(true);
  });
  afterAll(() => {
    shell.exec('rm -rf ./test/*.png');
  });
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
  test('should get empty arry from a undesirable string', () => {
    const path = '/';
    expect(splitPath(path)).toMatchObject([]);
  })
});
