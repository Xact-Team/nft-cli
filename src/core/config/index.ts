import { validateOrReject } from 'class-validator';
import * as fs from 'fs';

import { Config } from './interfaces/config.interface';

export const getConfig = async (path: string): Promise<Config> => {
  const content = await fs.promises.readFile(path, {
    encoding: 'utf-8',
  });
  const json = JSON.parse(content);

  validateOrReject(json as Config);

  return json as Config;
};
