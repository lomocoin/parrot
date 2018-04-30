export default class BaseEntity {

  protected static sequence: number = 0;

  static nextVal() {
    return BaseEntity.sequence ++;
  }

  id: number;
  createdAt: number;
}
