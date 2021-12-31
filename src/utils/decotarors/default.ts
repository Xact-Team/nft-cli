/* eslint-disable new-cap */
import { Transform } from 'class-transformer';

export function Default(defaultValue: any): PropertyDecorator {
  return Transform(({ value }) => value || defaultValue);
}
