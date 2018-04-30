import getRandomNumber from './getRandomNumber';

export default (enums: any[]): any => enums[getRandomNumber({ high: enums.length - 1 })];
