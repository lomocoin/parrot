export default class BaseEntity {

  static sequence: number = 0;
  static EntityName: string;

  static nextVal() {
    return BaseEntity.sequence ++;
  }

  id: number;
  createdAt: number;
}
