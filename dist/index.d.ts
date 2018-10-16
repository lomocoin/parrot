import { Express } from 'express';
export { Entity, IEntityInstance } from './Entity';
export { Column } from './decorators/Column';
export { ManyToOne, OneToMany, OneToOne, ManyToMany } from './decorators/Relation';
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
