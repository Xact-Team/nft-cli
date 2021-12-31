/* eslint-disable new-cap */
import { CategoryNFT, HederaEnvironment } from '@xact-wallet-sdk/nft';
import { Type } from 'class-transformer';
import {
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  IsObject,
  IsArray,
  IsOptional,
  IsNumber,
} from 'class-validator';

import { Default } from '../../../utils/decotarors/default';

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

export class CustomFee {
  @IsNumber()
  @IsNotEmpty()
  numerator: number;

  @IsNumber()
  @IsNotEmpty()
  denominator: number;

  @IsNumber()
  @IsNotEmpty()
  fallbackFee: number;

  @IsString()
  @IsNotEmpty()
  collectorAccountId: string;
}

export class Metadata {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Default('')
  symbol: string;

  @IsEnum(CategoryNFT)
  @Default(CategoryNFT.ART)
  category: CategoryNFT;

  @IsString()
  @IsNotEmpty()
  creator: string;

  @ValidateNested({ each: true })
  @IsArray()
  @Type(() => CustomFee)
  @IsOptional()
  customRoyaltyFee?: CustomFee[] | null;

  @IsObject()
  @IsOptional()
  customProperties?: Record<string, unknown> | null;
}

export class Configuration {
  @IsString()
  @IsNotEmpty()
  nftStorageApiKey: string;

  @ValidateNested({ each: true })
  @Type(() => HederaAccount)
  @IsNotEmpty()
  hederaAccount: HederaAccount;

  @ValidateNested({ each: true })
  @Type(() => Metadata)
  @IsOptional()
  metadata?: Metadata;
}
