import { RelationOption } from './Relations';
export declare const ManyToOne: (option: RelationOption) => (target: any, propertyName: string) => void;
export declare const OneToMany: (option: RelationOption) => (target: any, propertyName: string) => void;
export declare const OneToOne: (option: RelationOption) => (target: any, propertyName: string) => void;
export declare const ManyToMany: (option: RelationOption) => (target: any, propertyName: string) => void;
