import {
  CategoryNFT,
  ClientNFT,
  DebugLevel,
  NFT,
  NftCreated,
} from '@xact-wallet-sdk/nft';
import 'reflect-metadata';

import { Configuration } from '../configuration/interfaces/configuration.interface';
import { NFTFileContent } from './interfaces/nft-file-content.interface';

export const mint = async (
  configuration: Configuration,
  nftContents: NFTFileContent | NFTFileContent[],
  supply = 0,
): Promise<NftCreated> => {
  // Create client
  const client = new ClientNFT({
    hederaAccount: configuration.hederaAccount,
    nftStorageApiKey: configuration.nftStorageApiKey,
    debugLevel: DebugLevel.DEBUG,
  });

  if (Array.isArray(nftContents)) {
    if (!configuration.metadata) {
      throw new Error(
        '`metadata` should be defined in your json configuration file.',
      );
    }

    // Token metadata
    const name = configuration.metadata.name;
    const symbol = configuration.metadata.symbol;
    const customRoyaltyFee = configuration.metadata.customRoyaltyFee ?? null;

    // Map NFT metadata
    const nfts = nftContents.map(
      (nftContent) =>
        ({
          name: nftContent.metadata.name,
          description: nftContent.metadata.description,
          category: configuration.metadata!.category,
          creator:
            nftContent.metadata.creator ?? configuration.metadata!.creator,
          attributes: nftContent.metadata.attributes ?? null,
          customProperties:
            nftContent.metadata.customProperties ??
            configuration.metadata!.customProperties ??
            null,
          media: nftContent.media,
        } as NFT),
    );

    return client.createAndMint({
      name,
      symbol,
      customRoyaltyFee,
      nfts,
    });
  }

  const nftContent = nftContents;
  const name = nftContent.metadata.name;
  const description = nftContent.metadata.description;
  const category = nftContent.metadata.category ?? CategoryNFT.ART;
  const attributes = nftContent.metadata.attributes ?? null;
  const creator =
    nftContent.metadata.creator ?? configuration.metadata?.creator;
  const customRoyaltyFee = nftContent.metadata.customRoyaltyFee ?? null;
  const customProperties =
    nftContent.metadata.customProperties ??
      (configuration.metadata && configuration.metadata!.customProperties) ??
    null;

  const media = nftContent.media;

  return client.createAndMint({
    name,
    description,
    category,
    creator,
    supply,
    media,
    attributes,
    customProperties,
    customRoyaltyFee,
  });
};
