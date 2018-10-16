export default class BaseEntity {
    static sequence: number;
    static EntityName: string;
    static nextVal(): number;
    id: number;
    createdAt: number;
}
