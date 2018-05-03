# mock-api

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
        type: 'number'
        limit: [4, 8]
    })
    balance: number;

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
}
~~~

### configure mock 

~~~
{
  "port": 3000,
  "models": "./test/models"
}
~~~
