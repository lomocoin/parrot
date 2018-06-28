import getRandomImage from '../utils/getRandomImage';

export class ImageRepo extends Map<string, string> {
  private imagePath: string;

  setImagePath(imagePath: string):void {
    this.imagePath = imagePath;
  }

  setImage(width: number, height: number): string {
    const resolution = `${width}*${height}`;
    if (this.has(resolution)) {
      return this.get(resolution)!;
    }
    const relativePath = getRandomImage({ width, height, imagePath: this.imagePath });
    this.set(resolution, relativePath);
    return relativePath;
  }
}

export default new ImageRepo();
