import { Errors } from '@oclif/core';
import * as fs from 'fs';
import path from 'path';

import { NFTFileContent } from './interfaces/nft-file-content.interface';
import { allowedExtensions } from '../../utils/constants';
import { notEmpty } from '../../utils/not-empty';
import { readNFT } from './read-nft';

interface PairedFile {
  metadataPath: string | null;
  imagePath: string | null;
}

export const readNFTs = async (
  directoryPath: string,
): Promise<NFTFileContent[]> => {
  const filePaths = await fs.promises.readdir(directoryPath);
  // Extract file by pair json and image
  // eslint-disable-next-line unicorn/no-array-reduce
  const pairedFiles = filePaths.reduce((acc, filePath) => {
    const filename = path.basename(filePath);
    const extension = path.extname(filePath).toLocaleLowerCase();
    const basename = filename.replace(extension, '');

    if (allowedExtensions.has(extension)) {
      if (!acc[basename]) {
        acc[basename] = { metadataPath: null, imagePath: null };
      }

      if (extension === '.json') {
        acc[basename].metadataPath = filePath;
      } else {
        acc[basename].imagePath = filePath;
      }
    }

    return acc;
  }, {} as { [key: string]: PairedFile });

  // Create promises to read all files
  const promises = Promise.all(
    Object.values(pairedFiles).map(async (file) => {
      if (!file.imagePath || !file.metadataPath) {
        Errors.warn(
          `Corresponding ${
            file.imagePath === null ? '`image`' : '`json`'
          } file is missing for ${
            file.imagePath ?? file.metadataPath
          }, this one will be ignored.`,
        );
        return null;
      }

      return readNFT(
        `${directoryPath}/${file.metadataPath}`,
        `${directoryPath}/${file.imagePath}`,
      );
    }),
  );

  // Read content of all files
  const result = await promises;

  // Filter null paired
  return result.filter(notEmpty);
};
