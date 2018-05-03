
import fs from 'fs';
import { resolve } from 'path';
import Express from 'express';
import { pluralize } from 'inflected';
import DataBase from './DataBase';
import splitPath from './utils/splitPath';
import Repository from './storage/Repository';
import { NotFoundError } from './Errors';
import errorWrap from './utils/errorWrap';

const getRecord = (record: { [key: string]: any }, splittedPath: string[][]): any => {
  if (splittedPath.length === 0) {
    return record;
  }
  const [property, id] = splittedPath[0];
  if (!id) {
    return record[property];
  }
  const subRecord = record[property].find((r: any) => r.id === Number.parseInt(id, 10));
  if (splittedPath.length > 1) {
    return getRecord(subRecord, splittedPath.slice(1))
  }
  return subRecord;
}

const getHandler = (db: DataBase, splittedPath: string[][]) => {
  const repo = db.get(splittedPath[0][0])!;
  if (!repo) {
    throw new NotFoundError();
  }
  let resultSet = null;
  const [property, id] = splittedPath[0];
  if (id) {
    resultSet = repo.selectOne((r) => r.id === Number.parseInt(id, 10));
    return getRecord(resultSet, splittedPath.slice(1));
  } else {
    return repo.select();
  }
}

const postHandler = (db: DataBase, splittedPath: string[][], params: any) => {
  let repo;
  let parentRepo;
  if (splittedPath.length <= 0) {
    throw new NotFoundError();
  } else if (splittedPath.length === 1) {
    repo = db.get(splittedPath[splittedPath.length - 1][0])!;
    const record = new repo.Entity(...params)
    repo.insert(record);
  } else {
    repo = db.get(splittedPath[splittedPath.length - 1][0])!;
    const [parentRepoName, id] = splittedPath[splittedPath.length - 2][0];
    parentRepo = db.get(parentRepoName)!;
    const record = new repo.Entity(...params)
    repo.insert(record);
    const parentRecord = parentRepo.selectOne((r) => r.id === Number.parseInt(id, 10));
    parentRepo.update(parentRecord.id, { ...parentRecord, ...{
      [repo.Entity.EntityName]: [...parentRecord[repo.Entity.entityName], record],
    }});
  }
}

const putHandler = (db: DataBase, splittedPath: string[][], params: any) => {
  let repo;
  let parentRepo;
  if (splittedPath.length <= 0) {
    throw new NotFoundError();
  } else if (splittedPath.length === 1) {
    const [repoName, recordId] = splittedPath[splittedPath.length - 1];
    repo = db.get(repoName)!;
    repo.update(Number.parseInt(recordId), params);
  } else {
    const [repoName, recordId] = splittedPath[splittedPath.length - 1];
    const [parentRepoName, parentRecordId] = splittedPath[splittedPath.length - 2];
    repo = db.get(repoName)!;
    repo.update(Number.parseInt(recordId), params);
    parentRepo = db.get(parentRepoName)!;
    const parentRecord = parentRepo.selectOne((r) => r.id === Number.parseInt(parentRecordId, 10));
    parentRepo.update(Number.parseInt(parentRecordId), {
      [repo.Entity.EntityName]: [...parentRecord[repo.Entity.EntityName].map((r: any) => (
        r.id === recordId ? { ...params, ...r } : r
      ))],
    });
  }
}

const deleteHandler = (db: DataBase, splittedPath: string[][]) => {
  let repo;
  let parentRepo;
  if (splittedPath.length <= 0) {
    throw new NotFoundError();
  } else if (splittedPath.length === 1) {
    const [repoName, recordId] = splittedPath[splittedPath.length - 1];
    repo = db.get(repoName)!;
    repo.delete(Number.parseInt(recordId));
  } else {
    const [repoName, recordId] = splittedPath[splittedPath.length - 1];
    const [parentRepoName, parentRecordId] = splittedPath[splittedPath.length - 2];
    repo = db.get(repoName)!;
    repo.delete(Number.parseInt(recordId));
    parentRepo = db.get(parentRepoName)!;
    const parentRecord = parentRepo.selectOne((r) => r.id === Number.parseInt(parentRecordId, 10));
    parentRepo.update(Number.parseInt(parentRecordId), {
      [repo.Entity.EntityName]: [...parentRecord[repo.Entity.EntityName].filter((r: any) => (
        r.id !== recordId
      ))],
    });
  }
}

export default (config: any) => {

  const models = (fs.readdirSync(resolve('.', config.mockPath), 'utf-8') as string[])
    .map((name: string) => ({
      name: pluralize(name.replace(/\..*$/i, '').toLowerCase()),
      path: `${resolve('.', config.mockPath)}/${name}`,
    }))
  
  const db = new DataBase(models);
  
  return errorWrap(async (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    const splittedPath = splitPath(req.path);

    if (req.method === 'GET') {
      const result = await getHandler(db, splittedPath);
      return res.status(200).json(result).end();
    } else if (req.method === 'POST') {
      await postHandler(db, splittedPath, req.body);
      return res.status(201).end();
    } else if (req.method === 'PUT') {
      await putHandler(db, splittedPath, req.body);
      return res.status(200).end();
    } else if (req.method === 'PATCH') {
      await putHandler(db, splittedPath, req.body);
      return res.status(200).end();
    } else if (req.method === 'DELETE') {
      await deleteHandler(db, splittedPath);
      return res.status(200).end();
    } else {
      return res.status(405).end();
    }
  })
} 
