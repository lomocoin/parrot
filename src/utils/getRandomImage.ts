import path from 'path';
import images from 'images';

export default ({ width, height, imagePath }: { width: number, height: number, imagePath: string }): string => {
  const resolvePath = path.resolve(imagePath, `${width}*${height}.png`);
  const image = images(width, height)
    .fill(0xd8, 0xd8, 0xd8, 1)
    .save(resolvePath, {
      quality: 50,
    })
  return path.relative(path.resolve('.', imagePath), resolvePath);
};
