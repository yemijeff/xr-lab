import { z } from 'zod';

export const PublicationStatusSchema = z.enum([
  'draft',
  'working',
  'review',
  'published',
  'archived',
]);

export type PublicationStatus = z.infer<typeof PublicationStatusSchema>;

export const ContentTypeSchema = z.enum([
  'note',
  'journal',
  'report',
  'case-study',
  'experiment',
  'research',
  'principle',
  'knowledge',
]);

export type ContentType = z.infer<typeof ContentTypeSchema>;
