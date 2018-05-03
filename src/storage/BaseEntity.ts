export default class BaseEntity {

  protected static sequence: number = 0;
  protected static EntityName: string;

  static nextVal() {
    return BaseEntity.sequence ++;
  }

  id: number;
  createdAt: number;
}
