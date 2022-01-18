import * as fs from 'fs';

import { NFTFileContent } from './interfaces/nft-file-content.interface';

export const readNFT = async (
  metadataPath: string,
  imagePath: string,
): Promise<NFTFileContent> => {
  const media = imagePath;
  // Read metadata
  const content = await fs.promises.readFile(metadataPath, {
    encoding: 'utf-8',
  });
  const metadata = JSON.parse(content);

  return {
    metadata,
    media,
  } as NFTFileContent;
};
