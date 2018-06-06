export default ({ limit }: { limit: [number, number] | number }): number => {
  if (typeof limit === 'number') {
    limit = [0, limit];
  }
  const [low, high] = limit;
  return Number.parseInt((Math.random() * (high - low) + low).toFixed());
}
