/* eslint-disable new-cap */
import { Transform } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Default(defaultValue: any): PropertyDecorator {
  return Transform(({ value }) => value || defaultValue);
}
