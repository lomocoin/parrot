import { relative, dirname } from 'path';
import { pluralize } from 'inflected';
import Repository from './storage/Repository';
import metaRepo from './storage/MetaRepo';

export interface IModel {
  name: string;
  path: string;
}

export default class DataBase extends Map<string, Repository> {
  constructor(models: IModel[], config: any) {
    super();
    // create repositorys and first record
    models.forEach(({ name, path }: { name: string, path: string }) => {
      const Entity = require(path).default;
      const record = new Entity(config, path);
      const repository = new Repository(Entity);
      repository.insert(record);
      this.set(name.replace(`${dirname(name)}/`, ''), repository);
    });

    models.forEach(({ name }) => {
      // mapping OneToMany
      (metaRepo.getMeta(name, 'OneToMany') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(pluralize(option.target.toLowerCase()))!.select((r, i) => i % source.length === index),
          });
        })
      });
      // mapping ManyToOne
      (metaRepo.getMeta(name, 'ManyToOne') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(pluralize(option.target.toLowerCase()))!.selectOne((r) => (r as any)[option.targetProperty] === record!.id)
          });
        })
      });
      // mapping OneToOne
      (metaRepo.getMeta(name, 'OneToOne') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(pluralize(option.target.toLowerCase()))!.select((r, i) => i === index)
          });
        })
      });
      // mapping ManyToMany
      (metaRepo.getMeta(name, 'ManyToMany') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(pluralize(option.target.toLowerCase()))!.select((r, i) => index % (i + 1) === 0)
          });
        })
      });
    })
  }
};
