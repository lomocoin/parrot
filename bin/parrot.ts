import commander from 'commander';
import { Server } from '../src';
import * as pkg from '../package.json';

commander
  .version((pkg as any).version)
  .option('-c --config <path>', 'Path to config file, default: ./.mock.json')
  .option('-q, --quiet', 'Disable logging.')
  .parse(process.argv);

const option = {
  config: commander.config || './.mock.json',
  quite: !!commander.quite,
};

new Server(option).run();
