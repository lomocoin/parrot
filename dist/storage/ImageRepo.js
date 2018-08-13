"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRandomImage_1 = __importDefault(require("../utils/getRandomImage"));
class ImageRepo extends Map {
    setImagePath(imagePath) {
        this.imagePath = imagePath;
    }
    setImage(width, height) {
        const resolution = `${width}*${height}`;
        if (this.has(resolution)) {
            return this.get(resolution);
        }
        const relativePath = getRandomImage_1.default({ width, height, imagePath: this.imagePath });
        this.set(resolution, relativePath);
        return relativePath;
    }
}
exports.ImageRepo = ImageRepo;
exports.default = new ImageRepo();
//# sourceMappingURL=ImageRepo.js.map