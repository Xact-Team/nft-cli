import { Command, Flags } from '@oclif/core';
import { CLIError } from '@oclif/errors';
import { ValidationError } from 'class-validator';
import * as fs from 'fs';
import 'reflect-metadata';

import { getConfiguration } from '../../core/configuration';
import { readFiles } from '../../core/nft/read-files';
import { mintMultiMetadata } from '../../core/nft/mint-multi-metadata';
import {
  formatValidationErrors,
  instanceOfValidationErrors,
} from '../../utils/error/validation-error';

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

  async catch(
    error: (Error & { code: string }) | ValidationError[],
  ): Promise<void> {
    if (instanceOfValidationErrors(error)) {
      const { message, suggestions } = formatValidationErrors(error);

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
