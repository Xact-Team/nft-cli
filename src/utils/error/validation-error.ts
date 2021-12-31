import { ValidationError } from 'class-validator';

export const instanceOfValidationErrors = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  array: any,
): array is ValidationError[] => {
  return array?.[0] && instanceOfValidationError(array[0]);
};

export const instanceOfValidationError = (
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  object: any,
): object is ValidationError => {
  return object instanceof ValidationError;
};

export const formatValidationErrors = (
  validationErrors: ValidationError[],
): {
  message: string;
  suggestions: string[];
} => {
  const messages: string[] = [];
  const suggestions: string[] = [];

  for (const error of validationErrors) {
    if (error.children && error.children.length > 0) {
      const res = formatValidationErrors(error.children);

      messages.push(res.message);
      suggestions.push(...res.suggestions);
    } else {
      messages.push(`\`${error.property}\` contain errors.`);

      for (const constraint in error.constraints) {
        // eslint-disable-next-line no-prototype-builtins
        if (!error.constraints.hasOwnProperty(constraint)) {
          continue;
        }

        suggestions.push(error.constraints[constraint]);
      }
    }
  }

  return { message: messages.join('\n'), suggestions };
};
