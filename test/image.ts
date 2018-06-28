import path from 'path';
import getRandomImage from '../src/utils/getRandomImage';

const image = getRandomImage({ width: 400, height: 300, imagePath: path.resolve(__dirname, './source') });
