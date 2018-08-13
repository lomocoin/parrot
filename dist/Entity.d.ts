import { IString, IInteger, IBool, IEnum } from './decorators/PropertyTypes';
export interface MetaEntity {
    string: IString[];
    number: IInteger[];
    bool: IBool[];
    enum: IEnum[];
}
export interface IEntityInstance {
    new (...args: any[]): any;
}
export declare const Entity: (constructor: IEntityInstance) => IEntityInstance;
