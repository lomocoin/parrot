# mock-api

## folders

~~~
-.mock
  |_model
      |_User.ts
  |_sources
      |_name.json
      |_address.json
-package.json
~~~

## types

- @Entity

- @String(length: number)
- @Number(integerPart: number, decimalPart: number)
- @Bool()
- @Enum(enums: Array<any>) | Enum(jsonPath: string)
- @OneToMany(EntityName: string)
- @OneToOne(EntityName: string)
- @ManyToOne(EntityName: string)

## How To Use

### declare entities

~~~
@Entity
class Foo extends BaseEntity {

    @String({ limit: [5, 8] })
    name: string;

    @Number({ integer: 8, decimal: 4 })
    balance: number;

    @Enum(['normal', 'warning', 'error'])
    status: any;

    @Enum('./address')
    address: any;
}
~~~

### configure mock 

~~~
{
    baseUrl: ''
}
~~~
