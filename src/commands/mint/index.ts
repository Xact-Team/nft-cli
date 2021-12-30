import { Command, Flags } from '@oclif/core';
import { CLIError } from '@oclif/errors';
// import {
//   ClientNFT,
//   HederaEnvironment,
//   DebugLevel,
//   CustomFee,
//   NFT,
//   CategoryNFT,
//   HederaAccount,
// } from '@xact-wallet-sdk/nft';
import * as fs from 'fs';
import path from 'path';

// import { getConfig } from '../../core/config';

const allowedExtensions = new Set(['.json', '.png', '.jpeg', '.jpg']);

interface NFTContent {
  json: Record<string, any>;
  base64: string;
}

export default class Mint extends Command {
  static description = 'Say hello';

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
    if (error.code === 'ENOENT') {
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

  // async mint(
  //   client: ClientNFT,
  //   nftContents: NFTContent[],
  //   creator: string,
  // ): Promise<void> {
  //   /* Create NFT with multiple metadata under one token */
  //   const name = 'NFT Test';
  //   const customRoyaltyFee: CustomFee[] = [
  //     {
  //       numerator: 1,
  //       denominator: 10,
  //       fallbackFee: 100,
  //       collectorAccountId: '0.0.123456',
  //     },
  //   ];
  //   const nfts = nftContents.map(
  //     (nftContent) =>
  //       ({
  //         name: nftContent.json.name,
  //         description: nftContent.json.description,
  //         category: CategoryNFT.ART,
  //         creator: 'Johny.B',
  //         attributes: nftContent.json.attributes ?? null,
  //         customProperties: null,
  //         media: nftContent.base64,
  //       } as NFT),
  //   );

  //   await client.createAndMint({ name, customRoyaltyFee, nfts });
  // }

  async run(): Promise<void> {
    const { flags } = await this.parse(Mint);

    // const config = await getConfig(flags.config);

    const isDirectory = fs.lstatSync(flags.from).isDirectory();

    if (!isDirectory) {
      throw new CLIError('The given path is not a directory');
    }

    console.log('CONFIG:', flags.config);

    // Create client
    // const client = new ClientNFT({
    //   hederaAccount: config.hederaAccount,
    //   nftStorageApiKey: config.nftStorageApiKey,
    //   debugLevel: DebugLevel.WARN,
    // });

    const filePaths = await fs.promises.readdir(flags.from);
    // Extract file by pair json and image
    // eslint-disable-next-line unicorn/no-array-reduce
    const pairedFiles = filePaths.reduce((acc, filePath) => {
      const filename = path.basename(filePath);
      const extension = path.extname(filePath).toLocaleLowerCase();
      const basename = filename.replace(extension, '');

      if (allowedExtensions.has(extension)) {
        if (!acc[basename]) {
          acc[basename] = { jsonPath: '', imagePath: '' };
        }

        if (extension === '.json') {
          acc[basename].jsonPath = filePath;
        } else {
          acc[basename].imagePath = filePath;
        }
      }

      return acc;
    }, {} as { [key: string]: { jsonPath: string; imagePath: string } });

    // Create promises to read all files
    const promises = Promise.all(
      Object.values(pairedFiles).map(async (file) => {
        const imageBase64 = await fs.promises.readFile(
          `${flags.from}/${file.imagePath}`,
          { encoding: 'base64' },
        );
        const fileContent = await fs.promises.readFile(
          `${flags.from}/${file.jsonPath}`,
          { encoding: 'utf-8' },
        );

        return {
          json: JSON.parse(fileContent),
          base64: imageBase64,
        } as NFTContent;
      }),
    );

    await promises;

    // await this.mint(client, nftContents, flags.creator);

    // this.log(`path is from ${flags.from}! (./src/commands/mint/index.ts)`);
  }
}
