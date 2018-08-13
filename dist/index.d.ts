/// <reference types="express" />
import { Express } from 'express';
export { Entity } from './Entity';
export { Column } from './decorators/Column';
export { OneToMany, ManyToOne, OneToOne } from './decorators/Relation';
export { mockMiddleware } from './middleware';
export declare class Server {
    app: Express;
    config: any;
    tokens: Set<string>;
    constructor(option: {
        config: string;
        quite: boolean;
    });
    run(): void;
}
