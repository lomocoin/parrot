import getRandomNumber from './getRandomNumber';

export default ({ start, length }: { start: number, length: number }): string => {
  const len = getRandomNumber({ low: start, high: length });

  return Array.apply(null, {length: len})
    .map((): boolean => getRandomNumber({ high: 1 }) === 1)
    .map((upperCase: boolean) => {
      return upperCase ? getRandomNumber({ low: 65, high: 90 })
        : getRandomNumber({ low: 97, high: 122 });
    })
    .map((code: number): string => String.fromCharCode(code))
    .join('');
}
