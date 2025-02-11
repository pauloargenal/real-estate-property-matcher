import { z } from 'zod';

/**
 * Get first validation error from a list of validation errors, if any.
 */
export function getValidationError<ValidationErrorGenericType>(
  result: z.SafeParseReturnType<any, any>,
  validationErrors: ValidationErrorGenericType[]
): ValidationErrorGenericType | undefined {
  if (result.success) {
    return undefined;
  }

  const errorSet = new Set();

  for (const issue of result.error.issues) {
    errorSet.add(issue.message);
  }

  for (const validationError of validationErrors) {
    if (errorSet.has(validationError)) {
      return validationError;
    }
  }
}
