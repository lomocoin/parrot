export default class BaseEntity {

  static sequence: number = 0;
  static EntityName: string;

  static nextVal() {
    return BaseEntity.sequence ++;
  }

  id: number = -1;
  createdAt: number = new Date().getTime();
}
