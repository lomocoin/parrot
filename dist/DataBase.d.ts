import Repository from './storage/Repository';
export interface IModel {
    name: string;
    path: string;
}
export default class DataBase extends Map<string, Repository> {
    constructor(models: IModel[], config: any);
}
