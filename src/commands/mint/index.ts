import { Command, Flags } from '@oclif/core';
import { CLIError } from '@oclif/errors';
import * as fs from 'fs';
import 'reflect-metadata';

import { getConfiguration } from '../../core/configuration';
import { readFiles } from '../../core/nft/read-files';
import { mintMultiMetadata } from '../../core/nft/mint-multi-metadata';
import { ValidationError } from 'class-validator';

function formatErrors(validationErrors: ValidationError[]): {
  message: string;
  suggestions: string[];
} {
  const messages: string[] = [];
  const suggestions: string[] = [];

  for (const error of validationErrors) {
    messages.push(`\`${error.property}\` contain errors.`);

    console.log('ERR:', error);

    if (error.children && error.children.length > 0) {
      const res = formatErrors(error.children);

      console.log('RES:', res);
      messages.push(res.message);
      suggestions.push(...res.suggestions);
    } else {
      console.log('constraints:', error.constraints);
      for (const constraint in error.constraints) {
        // eslint-disable-next-line no-prototype-builtins
        if (!error.constraints.hasOwnProperty(constraint)) {
          continue;
        }

        suggestions.push(error.constraints[constraint]);
      }
    }
  }

  return { message: messages.join('\n'), suggestions };
}

export default class Mint extends Command {
  static description = "Mint your NFT's";

  static examples = [
    `$ oex hello friend --from oclif
      hello friend from oclif! (./src/commands/hello/index.ts)
    `,
  ];

  static flags = {
    config: Flags.string({
      char: 'c',
      description: 'Path of your config file',
      default: `${process.cwd()}/config.json`,
      required: false,
    }),
    from: Flags.string({
      char: 'f',
      description: "Path from which you want to create your NFT's",
      default: process.cwd(),
      required: true,
    }),
  };

  static args = [];

  async catch(error: Error & { code: string }): Promise<void> {
    console.log('ERROR:', error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.length > 0) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { message, suggestions } = formatErrors(error);
      console.log(message, suggestions);
      this.error(message, {
        code: 'ValidationError',
        exit: 3,
        suggestions,
      });
    } else if (error.code === 'ENOENT') {
      this.error('The given path seems to be invalid.', {
        code: 'ENOENT',
        exit: 2,
        suggestions: [
          'Check if your path is a valid path',
          'Check if you path exist',
        ],
      });
    } else {
      this.error(error);
    }
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Mint);

    this.log('Checking your configuration...');

    const configuration = await getConfiguration(flags.config);

    this.log('Checking if the path is a directory');

    const isDirectory = fs.lstatSync(flags.from).isDirectory();

    if (!isDirectory) {
      throw new CLIError('The given path is not a directory');
    }

    this.log('Reading the content of all the paired files...');

    const nftFileContents = await readFiles(flags.from);

    this.log('Running minting of your directory...');

    await mintMultiMetadata(configuration, nftFileContents);
  }
}
