import fs from 'fs';
import Express from 'express';
import path from 'path';
import DataBase from './DataBase';
import splitPath from './utils/splitPath';
import Repository from './storage/Repository';

// TODO: load configs
const db = new DataBase();

const getRecord = (record: { [key: string]: any }, splittedPath: Array<string[]>): any => {
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

const query = (repo: Repository, splittedPath: Array<string[]>) => {
  let resultSet = null;
  const [property, id] = splittedPath[0];
  if (id) {
    resultSet = repo.selectOne((r) => r.id === Number.parseInt(id, 10));
    return getRecord(resultSet, splittedPath.slice(1));
  } else {
    return repo.select();
  }
}

export default function(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
  const splittedPath = splitPath(req.path);

  if (splittedPath.length === 0) {
    // TODO: list all repos
    return res.status(404).end();
  }
  const mainRepo = db.get(splittedPath[0][0]);
  if (!mainRepo) {
    return res.status(404).end();
  }
  const result = query(mainRepo!, splittedPath);
  return res.status(200).json(result).end();
}
