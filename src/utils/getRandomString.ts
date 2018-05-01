import getRandomNumber from './getRandomNumber';

export default ({ limit }: { limit: [number, number] | number }): string => {
  if (typeof limit === 'number') {
    limit = [0, limit];
  }
  const len = getRandomNumber({ limit });

  return Array.apply(null, {length: len})
    .map((): boolean => getRandomNumber({ limit: 1 }) === 1)
    .map((upperCase: boolean) => {
      return upperCase ? getRandomNumber({ limit: [65, 90] })
        : getRandomNumber({ limit: [97, 122] });
    })
    .map((code: number): string => String.fromCharCode(code))
    .join('');
}
