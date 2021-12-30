/* eslint-disable new-cap */
import {
  CategoryNFT,
  CustomFee,
  HederaEnvironment,
} from '@xact-wallet-sdk/nft';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsObject,
  IsArray,
} from 'class-validator';

export class HederaAccount {
  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  privateKey: string;

  @IsEnum(HederaEnvironment)
  @IsNotEmpty()
  environment: HederaEnvironment;
}

export class NftData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(CategoryNFT)
  @IsNotEmpty()
  category: CategoryNFT;

  @IsString()
  @IsNotEmpty()
  creator: string;

  @IsArray()
  customRoyaltyFee?: CustomFee[] | null;

  @IsObject()
  customProperties?: Record<string, unknown> | null;
}

export class Config {
  @ValidateNested({ each: true })
  hederaAccount: HederaAccount;

  @IsString()
  nftStorageApiKey: string;

  @ValidateNested({ each: true })
  nftData: NftData;
}
