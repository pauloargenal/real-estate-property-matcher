import { z } from 'zod';

export const validationSchemaWithParameters = {
  match: (desiredValue: string): z.ZodType<string, any> =>
    z.string().refine((value) => value === desiredValue),
  minimumNumberOfCharacters: (minChar: number): z.ZodType<string, any> => z.string().min(minChar)
};
