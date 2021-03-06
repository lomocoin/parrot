import BaseEntity from './BaseEntity';
export default class Repository {
    Entity: any;
    data: Map<number, BaseEntity | undefined>;
    constructor(entity: any);
    insert(record: BaseEntity): void;
    update(id: number, record: any): void;
    delete(id: number): void;
    select(filter?: (r: BaseEntity | undefined, i: number) => {} | undefined): Array<any | undefined>;
    selectOne(find: (r: BaseEntity | undefined, i: number) => boolean): any | undefined;
}
