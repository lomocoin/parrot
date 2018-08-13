import BaseEntity from '../src/storage/BaseEntity';
import { Entity, IEntityInstance } from '../src/Entity';
import Player from './model/Player';
import Skill from './model/Skill';
import Food from './model/Food';

describe("Entity", () => {

  const config = {
    port: 3000,
    outDir: ['test/models/**/*'],
    quite: false,
    auth:
    {
      username: 'custom-username',
      password: 'custom-password',
      whiteList: ['/lists']
    },
    compilerOptions:
    {
      module: 'commonjs',
      esModuleInterop: true,
      target: 'es6',
      noImplicitAny: true,
      moduleResolution: 'node',
      sourceMap: true,
      declaration: true,
      baseUrl: '.',
      emitDecoratorMetadata: true,
      experimentalDecorators: true,
      strictNullChecks: true,
      paths: { '*': [Array] }
    },
    include: ['test/models/**/*'],
    exclude: ['src'], 
  }

  test("Entity should be a instance of IEntityInstance", () => {
    const player = new Player(config, );
  })
});
