import { z } from 'zod';

import { ValidationError } from './validation-error';
import { regex } from './regex';

export const validationSchema: Record<string, z.ZodTypeAny> = {
  email: z.string().email(ValidationError.Email),
  noSpecialCharacter: z
    .string()
    .refine((value) => !regex.specialCharacter.test(value), ValidationError.NoSpecialCharacter),
  number: z.string().refine((value) => regex.number.test(value), ValidationError.Number),
  nonempty: z.string().nonempty(ValidationError.Empty),
  noWhitespace: z.string().refine((value) => !/\s/.test(value), ValidationError.NoWhitespace)
};
