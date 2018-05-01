export default ({ limit }: { limit: [number, number] | number }): number => {
  if (typeof limit === 'number') {
    limit = [0, limit];
  }
  const [low, high] = limit;
  return Math.ceil(Math.random() * (high - low) + low);
}
