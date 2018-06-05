import { Express, RequestHandler } from 'express';
import { IEntityInstance } from './src/Entity';
import { PropertyOption } from './src/decorators/PropertyTypes';
import { RelationOption } from './src/decorators/Relations';

declare function mockMiddleware (config: any): RequestHandler 

declare class Server {
  app: Express;
  config: any;
  constructor(option: { config: string, quite: boolean });
  run(): any;
}

declare function Entity (constructor: IEntityInstance): IEntityInstance;

declare function Column (option: PropertyOption): (target: any, propertyName: string) => void;

declare function OneToMany (option: RelationOption): (target: any, propertyName: string) => void;
declare function ManyToOne (option: RelationOption): (target: any, propertyName: string) => void;
declare function OneToOne (option: RelationOption): (target: any, propertyName: string) => void;
declare function ManyToMany (option: RelationOption): (target: any, propertyName: string) => void;

