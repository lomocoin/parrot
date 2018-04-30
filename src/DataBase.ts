import fs from 'fs';
import { resolve } from 'path';
import Repository from './storage/Repository';
import metaRepo from './storage/MetaRepo';

const models = (fs.readdirSync(resolve(__dirname, '../test/models'), 'utf-8') as string[])
  .map((name: string) => ({
    name: name.replace(/\..*$/i, '').toLowerCase(),
    path: `${resolve(__dirname, '../test/models')}/${name}`,
  }))

export default class DataBase extends Map<string, Repository> {
  constructor() {
    super();
    // create repositorys and first record
    models.forEach(({ name, path }: { name: string, path: string }) => {
      const Entity = require(path).default;
      const repository = new Repository(Entity);
      repository.insert(new Entity())
      this.set(name, repository);
    });

    models.forEach(({ name }) => {
      // mapping OneToMany
      (metaRepo.getMeta(name, 'OneToMany') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(option.targetTable.toLowerCase())!.select((r, i) => i % source.length === index),
          });
        })
      });
      // mapping ManyToOne
      (metaRepo.getMeta(name, 'ManyToOne') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(option.targetTable.toLowerCase())!.selectOne((r) => (r as any)[option.targetProperty] === record!.id)
          });
        })
      });
      // mapping OneToOne
      (metaRepo.getMeta(name, 'OneToOne') || []).map(({ name: propertyName, option }) => {
        const repository = this.get(name);
        const source = repository!.select();
        source.forEach((record, index) => {
          repository!.update(record!.id, {
            [propertyName]: this.get(option.targetTable.toLowerCase())!.select((r) => r.id === index)
          });
        })
      });
    })
  }
};
