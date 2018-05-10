# Parrot

a simple auto-generation mock service.

## folders

~~~
-.mock
  |_model
      |_User.ts
  |_sources
      |_name.json
      |_address.json
-.mock.json
~~~

## How To Use

### declare entities

~~~
@Entity
class Foo extends BaseEntity {

    @Column({
        type: 'string',
        limit: [5, 8],
    })
    name: string;

    @Column({
        type: 'integer',
        limit: [4, 8],
    })
    quantity: number;

    @Column({
        type: 'decimal',
        limit: 100,
        precision: 2,
    })
    money: number;

    @Column({
        type: 'enum',
        target: ['normal', 'warning', 'error']
    })
    status: any;

    @Column({
        type: 'enum',
        target: './address'
    })
    address: any;

    @Column({
        type: 'bool'
        value: false,
    })
    isDel: boolean;
}
~~~

### configure mock server

~~~
{
  "port": 3000,
  "models": "./test/models"
}
~~~

### start server

package.json
~~~
{
    ...,
    "scripts": {
        "mock": "parrot -c .mock.json"
    }
}
~~~
