export default ({ low, high }: { low?: number, high: number }): number => {
  if (!low) low = 0;
  return Math.ceil(Math.random() * (high - low) + low);
}
