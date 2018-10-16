"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const glob_1 = __importDefault(require("glob"));
const inflected_1 = require("inflected");
const DataBase_1 = __importDefault(require("./DataBase"));
const splitPath_1 = __importDefault(require("./utils/splitPath"));
const Errors_1 = require("./Errors");
const errorWrap_1 = __importDefault(require("./utils/errorWrap"));
const getRecord = (record, splittedPath) => {
    if (splittedPath.length === 0) {
        return record;
    }
    const [property, id] = splittedPath[0];
    if (!id) {
        return record[property];
    }
    const subRecord = record[property].find((r) => r.id === Number.parseInt(id, 10));
    if (splittedPath.length > 1) {
        return getRecord(subRecord, splittedPath.slice(1));
    }
    return subRecord;
};
const getHandler = (db, splittedPath) => {
    const repo = db.get(splittedPath[0][0]);
    if (!repo) {
        throw new Errors_1.NotFoundError();
    }
    let resultSet = null;
    const [id] = splittedPath[0];
    if (id) {
        resultSet = repo.selectOne((r) => r ? r.id === Number.parseInt(id, 10) : false);
        return getRecord(resultSet, splittedPath.slice(1));
    }
    else {
        return repo.select();
    }
};
const postHandler = (db, splittedPath, params) => {
    let repo;
    let parentRepo;
    if (splittedPath.length <= 0) {
        throw new Errors_1.NotFoundError();
    }
    else if (splittedPath.length === 1) {
        repo = db.get(splittedPath[splittedPath.length - 1][0]);
        const record = new repo.Entity(...params);
        repo.insert(record);
    }
    else {
        repo = db.get(splittedPath[splittedPath.length - 1][0]);
        const [parentRepoName, id] = splittedPath[splittedPath.length - 2][0];
        parentRepo = db.get(parentRepoName);
        const record = new repo.Entity(...params);
        repo.insert(record);
        const parentRecord = parentRepo.selectOne((r) => r ? r.id === Number.parseInt(id, 10) : false);
        parentRepo.update(parentRecord.id, Object.assign({}, parentRecord, {
            [repo.Entity.EntityName]: [...parentRecord[repo.Entity.entityName], record],
        }));
    }
};
const putHandler = (db, splittedPath, params) => {
    let repo;
    let parentRepo;
    if (splittedPath.length <= 0) {
        throw new Errors_1.NotFoundError();
    }
    else if (splittedPath.length === 1) {
        const [repoName, recordId] = splittedPath[splittedPath.length - 1];
        repo = db.get(repoName);
        repo.update(Number.parseInt(recordId, 10), params);
    }
    else {
        const [repoName, recordId] = splittedPath[splittedPath.length - 1];
        const [parentRepoName, parentRecordId] = splittedPath[splittedPath.length - 2];
        repo = db.get(repoName);
        repo.update(Number.parseInt(recordId, 10), params);
        parentRepo = db.get(parentRepoName);
        const parentRecord = parentRepo.selectOne((r) => r ? r.id === Number.parseInt(parentRecordId, 10) : false);
        parentRepo.update(Number.parseInt(parentRecordId, 10), {
            [repo.Entity.EntityName]: [...parentRecord[repo.Entity.EntityName].map((r) => (r.id === recordId ? Object.assign({}, params, r) : r))],
        });
    }
};
const deleteHandler = (db, splittedPath) => {
    let repo;
    let parentRepo;
    if (splittedPath.length <= 0) {
        throw new Errors_1.NotFoundError();
    }
    else if (splittedPath.length === 1) {
        const [repoName, recordId] = splittedPath[splittedPath.length - 1];
        repo = db.get(repoName);
        repo.delete(Number.parseInt(recordId, 10));
    }
    else {
        const [repoName, recordId] = splittedPath[splittedPath.length - 1];
        const [parentRepoName, parentRecordId] = splittedPath[splittedPath.length - 2];
        repo = db.get(repoName);
        repo.delete(Number.parseInt(recordId, 10));
        parentRepo = db.get(parentRepoName);
        const parentRecord = parentRepo.selectOne((r) => r ? r.id === Number.parseInt(parentRecordId, 10) : false);
        parentRepo.update(Number.parseInt(parentRecordId, 10), {
            [repo.Entity.EntityName]: [...parentRecord[repo.Entity.EntityName].filter((r) => (r.id !== recordId))],
        });
    }
};
exports.mockMiddleware = (config) => {
    const models = config.outDir.map((p) => glob_1.default.sync(`${p}.js`))
        .reduce((sum, array) => [...sum, ...array], [])
        .map((name) => ({
        name: inflected_1.pluralize(name.replace(/\..*$/i, '').toLowerCase()),
        path: path_1.resolve('.', name),
    }));
    const db = new DataBase_1.default(models, config);
    return errorWrap_1.default((req, res) => __awaiter(this, void 0, void 0, function* () {
        const splittedPath = splitPath_1.default(req.path);
        if (req.method === 'GET') {
            const result = yield getHandler(db, splittedPath);
            return res.status(200).json(result).end();
        }
        else if (req.method === 'POST') {
            yield postHandler(db, splittedPath, req.body);
            return res.status(201).end();
        }
        else if (req.method === 'PUT') {
            yield putHandler(db, splittedPath, req.body);
            return res.status(200).end();
        }
        else if (req.method === 'PATCH') {
            yield putHandler(db, splittedPath, req.body);
            return res.status(200).end();
        }
        else if (req.method === 'DELETE') {
            yield deleteHandler(db, splittedPath);
            return res.status(200).end();
        }
        else {
            return res.status(405).end();
        }
    }));
};
//# sourceMappingURL=middleware.js.map