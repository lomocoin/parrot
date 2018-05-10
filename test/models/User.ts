import { Entity } from "../../src/Entity";
import { Column } from "../../src/decorators/Column";

export interface IUserModel {
  id: number;
  username: string;
  password: string;
  avatar: string;
}

@Entity
export default class UserEntity implements IUserModel {
  id: number;

  @Column({
    type: "string",
    limit: [6, 10]
  })
  username: string;

  @Column({
    type: "string",
    limit: [6, 10]    
  })
  password: string;

  @Column({
    type: "string",
    limit: [6, 10]    
  })
  avatar: string;
}
