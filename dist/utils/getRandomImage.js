"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// import images from 'images';
exports.default = ({ width, height, imagePath }) => {
    const resolvePath = path_1.default.resolve(imagePath, `${width}*${height}.png`);
    // const image = images(width, height)
    //   .fill(0xd8, 0xd8, 0xd8, 1)
    //   .save(resolvePath, {
    //     quality: 50,
    //   })
    return path_1.default.relative(path_1.default.resolve('.', imagePath), resolvePath);
};
//# sourceMappingURL=getRandomImage.js.map