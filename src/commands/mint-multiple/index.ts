import { Command, Flags } from '@oclif/core';
import { CLIError } from '@oclif/errors';
import { ValidationError } from 'class-validator';
import * as fs from 'fs';
import 'reflect-metadata';

import { getConfiguration } from '../../core/configuration';
import { readNFTs } from '../../core/nft/read-nfts';
import { mint } from '../../core/nft/mint';
import {
  formatValidationErrors,
  instanceOfValidationErrors,
} from '../../utils/error/validation-error';

export default class Mint extends Command {
  static description = "Mint NFT's with multiple metadata";

  static examples = [
    `$ nft mint multiple -c sample.config.json -f ~/Downloads/nfts
      Checking your configuration...
      Checking if the path is a directory...
      Reading the content of all the paired files...
      Running minting of your directory...
      ...
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

    this.log('Checking if the path is a directory...');

    const isDirectory = fs.lstatSync(flags.from).isDirectory();

    if (!isDirectory) {
      throw new CLIError('The given path is not a directory');
    }

    this.log('Reading the content of all the paired files...');

    const nftFileContents = await readNFTs(flags.from);

    if (nftFileContents.length === 0) {
      this.log("Can't find any paired file in the provided folder.");
      return;
    }

    this.log('Running minting of your directory...');

    const res = await mint(configuration, nftFileContents);

    this.log(`Your tokenId is: ${res.tokenId}`);
    this.log(`Your nftId's are: ${JSON.stringify(res.nftIds)}`);
  }
}
