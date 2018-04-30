import DataBase from '../src/DataBase';


const database = new DataBase();

console.log(database.get('class')!.select());
