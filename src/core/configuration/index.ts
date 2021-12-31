import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import * as fs from 'fs';

import { Configuration } from './interfaces/configuration.interface';

export const getConfiguration = async (
  path: string,
): Promise<Configuration> => {
  const content = await fs.promises.readFile(path, {
    encoding: 'utf-8',
  });
  const json = JSON.parse(content);
  const config = plainToClass(Configuration, json, {
    exposeDefaultValues: true,
    exposeUnsetFields: true,
  });

  await validateOrReject(config, {
    skipMissingProperties: false,
  });

  return config;
};
