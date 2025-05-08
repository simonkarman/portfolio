import { z } from 'zod';
import { ProviderName } from './providers';

export const ProjectSchema = z.object({
  slug: z.string().regex(/^[a-zA-Z0-9-_]+$/),
  title: z.string(),
  date: z.string().date(),
  contributors: z.string(),
  description: z.string(),
  tags: z.array(z.string().regex(/^[a-zA-Z0-9-]+$/)),
  image: z.string(),
});

export type Project = {
  providerName: ProviderName,
} & z.infer<typeof ProjectSchema>;
