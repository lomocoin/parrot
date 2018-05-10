#!/usr/bin/env node

const commander =  require('commander');
const { resolve } = require('path');
const shell =  require('shelljs');
const { Server } =  require('../dist');

commander
  .version('1')
  .option('-c --config <path>', 'Path to config file, default: ./.mock.json')
  .option('-q, --quiet', 'Disable logging.')
  .parse(process.argv);

const option = {
  config: commander.config || '.mock.json',
  quite: !!commander.quite,
};

console.log(require(resolve('.', option.config)));

shell.exec(`tsc -p ${resolve('.', option.config)}`);

new Server(option).run();
