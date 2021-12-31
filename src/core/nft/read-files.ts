import * as fs from 'fs';
import path from 'path';

import { NFTFileContent } from './interfaces/nft-file-content.interface';
import { allowedExtensions } from '../../utils/constants';
import { Errors } from '@oclif/core';
import { notEmpty } from '../../utils/not-empty';

interface PairedFile {
  jsonPath: string | null;
  imagePath: string | null;
}

export const readFiles = async (
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
        acc[basename] = { jsonPath: null, imagePath: null };
      }

      if (extension === '.json') {
        acc[basename].jsonPath = filePath;
      } else {
        acc[basename].imagePath = filePath;
      }
    }

    return acc;
  }, {} as { [key: string]: PairedFile });

  // Create promises to read all files
  const promises = Promise.all(
    Object.values(pairedFiles).map(async (file) => {
      if (!file.imagePath || !file.jsonPath) {
        Errors.warn(
          `Corresponding ${
            file.imagePath === null ? '`image`' : '`json`'
          } file is missing for ${
            file.imagePath ?? file.jsonPath
          }, this one will be ignored.`,
        );
        return null;
      }

      // Read image base64
      const imageBase64 = await fs.promises.readFile(
        `${directoryPath}/${file.imagePath}`,
        { encoding: 'base64' },
      );
      // Read metadata
      const content = await fs.promises.readFile(
        `${directoryPath}/${file.jsonPath}`,
        { encoding: 'utf-8' },
      );
      const metadata = JSON.parse(content);

      return {
        metadata,
        imageBase64,
      } as NFTFileContent;
    }),
  );

  // Read content of all files
  const result = await promises;

  // Filter null paired
  return result.filter(notEmpty);
};
