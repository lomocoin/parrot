import getRandomNumber from './getRandomNumber';

export default (): boolean => getRandomNumber({ limit: 1 }) === 1;
