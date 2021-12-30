import { Command, Flags } from '@oclif/core';
import { CLIError } from '@oclif/errors';
// import { HederaEnvironment, ClientNFT } from '@xact-wallet-sdk/nft';
// eslint-disable-next-line node/no-missing-import
import * as fs from 'node:fs';
// eslint-disable-next-line node/no-missing-import
import * as path from 'node:path';

const allowedExtensions = new Set(['.json', '.png', '.jpeg', '.jpg']);

interface NFTContent {
  json: string;
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
    // accountId: Flags.string({
    //   char: 'a',
    //   description: 'Your accoundId',
    //   required: true,
    // }),
    // privateKey: Flags.string({
    //   char: 'p',
    //   description: 'Your privateKey',
    //   required: true,
    // }),
    // storageKey: Flags.string({
    //   char: 's',
    //   description: 'Your client storage api key',
    //   required: true,
    // }),
    from: Flags.string({
      char: 'f',
      description: "Path from which you want to create your NFT's",
      required: true,
    }),
    environment: Flags.string({
      char: 'e',
      description: 'Environment mainnet or testnet',
      required: false,
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

  async mint(): Promise<void> {
    // const hederaAccount = {
    //   accountId: 'YOUR_ACCOUNTID',
    //   privateKey: 'YOUR_PRIVATEKEY',
    //   environment: HederaEnvironment.TESTNET /* Default to MAINNET */,
    // };
    // /* Construct an instance of Client */
    // const client = new ClientNFT({
    //   hederaAccount,
    //   nftStorageApiKey: 'YOUR_TOKEN',
    // });
  }

  async run(): Promise<void> {
    const { flags } = await this.parse(Mint);

    const isDirectory = fs.lstatSync(flags.from).isDirectory();

    if (!isDirectory) {
      throw new CLIError('The given path is not a directory');
    }

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

    const nftContents = await promises;

    console.log('CONTENT:', nftContents);

    // await this.mint(nftContents);

    // this.log(`path is from ${flags.from}! (./src/commands/mint/index.ts)`);
  }
}
