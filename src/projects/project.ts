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

  // Some optional project fields
  documentation: z.string().optional(),
  download: z.string().optional(),
  repository: z.string().optional(),
  demo: z.string().optional(),
});

export type ProjectWithoutProviderName = z.infer<typeof ProjectSchema>;
export type ProjectWithProviderName = {
  providerName: ProviderName,
} & ProjectWithoutProviderName;
