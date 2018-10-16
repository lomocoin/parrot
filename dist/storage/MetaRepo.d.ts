import { IString, IInteger, IDecimal, IBool, IEnum, PropertyType, IDate } from '../decorators/PropertyTypes/index';
import { IManyToOne, IOneToMany, IOneToOne, IManyToMany, RelationType } from '../decorators/Relations';
import MetaEntity from './MetaEntity';
export declare class MetaRepo extends Map<string, MetaEntity> {
    pushProperty(entityName: string, type: PropertyType, property: IString | IInteger | IDecimal | IBool | IEnum | IDate): void;
    getMeta(entityName: string, type: PropertyType | RelationType): any[] | undefined;
    pushRelation(entityName: string, type: RelationType, relation: IManyToOne | IOneToMany | IOneToOne | IManyToMany): void;
}
declare const _default: MetaRepo;
export default _default;
