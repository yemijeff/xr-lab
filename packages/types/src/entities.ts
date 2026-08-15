import { z } from 'zod';
import { PublicationStatusSchema, ContentTypeSchema } from './publication';

// 1. Journal Entity Schema
export const JournalFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  type: ContentTypeSchema.default('journal'),
  status: PublicationStatusSchema.default('draft'),
  summary: z.string().optional(),
  stage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  relatedExperiments: z.array(z.string()).default([]),
  relatedProjects: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
});
export type JournalFrontmatter = z.infer<typeof JournalFrontmatterSchema>;

// 2. Experiment Entity Schema
export const ExperimentFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  status: PublicationStatusSchema.default('draft'),
  stage: z.string(),
  question: z.string(),
  hypothesis: z.string().optional(),
  skills: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  result: z.string().optional(),
  whatWorked: z.string().optional(),
  whatFailed: z.string().optional(),
  whatWasLearned: z.string().optional(),
  images: z.array(z.string()).default([]),
  videos: z.array(z.string()).default([]),
  prototypeLinks: z.array(z.string()).default([]),
  githubLinks: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  publishedAt: z.string().optional(),
});
export type ExperimentFrontmatter = z.infer<typeof ExperimentFrontmatterSchema>;

// 3. Project Entity Schema
export const ProjectFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  status: PublicationStatusSchema.default('draft'),
  summary: z.string(),
  problem: z.string().optional(),
  concept: z.string().optional(),
  stage: z.string().optional(),
  skills: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  images: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
});
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

// 4. Research Entity Schema
export const ResearchFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  status: PublicationStatusSchema.default('draft'),
  question: z.string(),
  findings: z.string().optional(),
  conclusion: z.string().optional(),
  tags: z.array(z.string()).default([]),
  relatedPrinciples: z.array(z.string()).default([]),
  publishedAt: z.string().optional(),
});
export type ResearchFrontmatter = z.infer<typeof ResearchFrontmatterSchema>;

// 5. Principle Entity Schema
export const PrincipleFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  statement: z.string(),
  evidence: z.array(z.string()).default([]),
  confidence: z.number().min(1).max(5).default(5),
  publishedAt: z.string().optional(),
});
export type PrincipleFrontmatter = z.infer<typeof PrincipleFrontmatterSchema>;

// 6. Knowledge Entity Schema
export const KnowledgeFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  definition: z.string(),
  simpleExplanation: z.string(),
  whyItMatters: z.string().optional(),
  confidence: z.number().min(1).max(5).default(5),
  tags: z.array(z.string()).default([]),
});
export type KnowledgeFrontmatter = z.infer<typeof KnowledgeFrontmatterSchema>;

// 7. Generic Content Item Container
export interface ContentItem<T> {
  frontmatter: T;
  content: string;
  slug: string;
  filePath: string;
}
