import getRandomNumber from './getRandomNumber';

export default (enums: any[]): any => enums[getRandomNumber({ limit: enums.length - 1 })];
