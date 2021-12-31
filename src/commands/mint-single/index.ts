import { Command, Flags } from '@oclif/core';
import { ValidationError } from 'class-validator';
import * as fs from 'fs';
import 'reflect-metadata';

import { getConfiguration } from '../../core/configuration';
import { readNFT } from '../../core/nft/read-nft';
import { mint } from '../../core/nft/mint';
import {
  formatValidationErrors,
  instanceOfValidationErrors,
} from '../../utils/error/validation-error';

export default class Mint extends Command {
  static description = "Mint NFT's with single metadata";

  static examples = [
    `$ nft mint single -c sample.config.json -m ~/Downloads/nft/metadata.json -i ~/Downloads/nft/image.png -s 1500
      Checking your configuration...
      Checking if your paths...
      Reading the content of your file...
      Running minting...
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
    metadata: Flags.string({
      char: 'm',
      description: 'Path of your json metadata file',
      required: true,
    }),
    image: Flags.string({
      char: 'i',
      description: 'Path of your image file',
      required: true,
    }),
    supply: Flags.integer({
      char: 's',
      description: 'Amount of supply',
      default: 1,
      required: false,
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

    this.log('Checking if your paths...');

    // Check if files exist
    fs.lstatSync(flags.metadata).isFile();
    fs.lstatSync(flags.config).isFile();

    this.log('Reading the content of your files...');

    const nftFileContents = await readNFT(flags.metadata, flags.image);

    this.log('Running minting...');

    const res = await mint(configuration, nftFileContents, flags.supply);

    this.log(`Your tokenId is: ${res.tokenId}`);
    this.log(`Your nftId's are: ${JSON.stringify(res.nftIds)}`);
  }
}
