import { z } from 'zod';

export const regex: Record<string, RegExp> = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /\d/,
  specialCharacter: /[!@#$%^&*(),.?":{}|<>]/
};

export const regexValidator = (
  regexValidator: RegExp,
  errorMessage: string
): Record<string, z.ZodTypeAny> => {
  return {
    match: z.string().refine((value: string) => {
      return regexValidator.test(value);
    }, errorMessage)
  };
};
