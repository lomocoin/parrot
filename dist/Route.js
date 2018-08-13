// import { resolve, dirname } from 'path';
// import { pluralize } from 'inflected';
// import BaseEntity from './storage/BaseEntity';
// import metaRepo from './storage/MetaRepo';
// import getRandomString from './utils/getRandomString';
// import getRandomNumber from './utils/getRandomNumber';
// import getRandomBoolean from './utils/getRandomBoolean';
// import getRandom from './utils/getRandom';
// import getRandomDate from './utils/getRandomDate';
// import applyMixins from './utils/applyMixins';
// export interface MetaEntity {
// }
// export interface IRouteInstance { new(...args: any[]): any }
// export const Route = (constructor: IRouteInstance): IRouteInstance => {
//   const RouteName = pluralize(constructor.toString().split(' ')[1].toLowerCase());
//  class RouteInstance extends constructor implements BaseEntity {
//     constructor(...args: any[]) {
//       super(...args);
//       const [config, basePath] = args;
//       metaRepo.getMeta(RouteName, 'string')!
//         .forEach(({ name, option }: IString) => {
//           (this as any)[name] = (args as any)[name] || getRandomString(option);
//         });
//       metaRepo.getMeta(RouteName, 'integer')!
//         .forEach(({ name, option }: IInteger) => {
//           (this as any)[name] = (args as any)[name] || getRandomNumber(option);
//         });
//       metaRepo.getMeta(RouteName, 'decimal')!
//         .forEach(({ name, option }: IDecimal) => {
//           // because of getRandomNumber will reture number in collection of (min, max],
//           // but in decimal mode we want (min, max)
//           const int = getRandomNumber(option) - 1;
//           const decimal = Math.random().toFixed(option.precition);
//           (this as any)[name] = (args as any)[name] || Number.parseFloat([int, decimal].join('.'));
//         });
//       metaRepo.getMeta(RouteName, 'bool')!
//         .forEach(({ name, option }: IBool) => {
//           (this as any)[name] = (args as any)[name] || ((option && option.value) ? option.value : getRandomBoolean());
//         });
//       metaRepo.getMeta(RouteName, 'enum')!
//         .forEach(({ name, option }: IEnum) => {
//           const enums = option.target instanceof Array ? option : require(resolve('.', dirname(basePath), (option.target as string)));
//           (this as any)[name] = (args as any)[name] || getRandom(enums);
//         });
//       metaRepo.getMeta(RouteName, 'date')!
//         .forEach(({ name, option }: IDate) => {
//           const randomDate = getRandomDate(option.format, option.start, option.end);
//           if ((args as any)[name]) {
//             (this as any)[name] = (args as any)[name];
//           } else if (!option.display || option.display === 'date') {
//             (this as any)[name] = randomDate.toDate();
//           } else if (option.display === 'string') {
//             (this as any)[name] = randomDate.format(option.format);
//           } else {
//             (this as any)[name] = randomDate.valueOf();
//           }
//         });
//       this.id = BaseEntity.nextVal();
//       this.createdAt = new Date().getTime();
//     }
//     static sequence: number = 1;
//     static RouteName: string = RouteName;
//     static nextVal() {
//       return RouteInstance.sequence ++;
//     }
//     id: number;
//     createdAt: number;
//   }
//   applyMixins(RouteInstance, [BaseEntity]);
//   return RouteInstance;
// }
//# sourceMappingURL=Route.js.map