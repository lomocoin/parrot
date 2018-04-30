import { Entity } from '../src/Entity';
import { Number, String, Bool, Enum } from '../src/types';
import path from 'path';

@Entity
class Foo {
  @String({ start: 5, length: 20})
  str: string;

  @String({ start: 3, length: 8})
  name: string;

  @Number({ low: 20, high: 30})
  age: number;

  @Bool()
  Male: boolean;

  @Enum(['Ada', 'Bella', 'Candy'])
  firstName: string;

  @Enum(path.resolve(__dirname, './source/lastName.json'))
  lastName: string;
}

const foo = new Foo();
const foo1 = new Foo();
const foo2 = new Foo();

console.log(foo);
console.log(foo2);
console.log(foo1);
