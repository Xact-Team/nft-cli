import { ClientNFT, DebugLevel, NFT, NftCreated } from '@xact-wallet-sdk/nft';
import 'reflect-metadata';

import { Configuration } from '../configuration/interfaces/configuration.interface';
import { NFTFileContent } from './interfaces/nft-file-content.interface';

export const mintMultiMetadata = async (
  configuration: Configuration,
  nftContents: NFTFileContent[],
): Promise<NftCreated> => {
  // Create client
  const client = new ClientNFT({
    hederaAccount: configuration.hederaAccount,
    nftStorageApiKey: configuration.nftStorageApiKey,
    debugLevel: DebugLevel.DEBUG,
  });

  // Token metadata
  const name = configuration.metadata.name;
  const customRoyaltyFee = configuration.metadata.customRoyaltyFee ?? null;
  const symbol = configuration.metadata.symbol;

  // Map NFT metadata
  const nfts = nftContents.map(
    (nftContent) =>
      ({
        name: nftContent.metadata.name,
        description: nftContent.metadata.description,
        category: configuration.metadata.category,
        creator: configuration.metadata.creator,
        attributes: nftContent.metadata.attributes ?? null,
        customProperties: null,
        media: nftContent.imageBase64,
      } as NFT),
  );

  return client.createAndMint({
    name,
    symbol,
    customRoyaltyFee,
    nfts,
  });
};
