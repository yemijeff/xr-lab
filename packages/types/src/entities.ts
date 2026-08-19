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
  spatialUX: z.string().optional(),
  stage: z.string().optional(),
  skills: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  coverImage: z.string().optional(),
  images: z.array(z.string()).default([]),
  videos: z.array(z.string()).default([]),
  prototypeLinks: z.array(z.string()).default([]),
  githubLinks: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  publishedAt: z.string().optional(),
});
export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;

// 4. Research Entity Schema
export const ResearchFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string().optional(),
  status: PublicationStatusSchema.default('draft'),
  stage: z.string().optional(),
  question: z.string(),
  findings: z.string().optional(),
  conclusion: z.string().optional(),
  tags: z.array(z.string()).default([]),
  sources: z.array(z.string()).default([]),
  evidence: z.array(z.string()).default([]),
  relatedPrinciples: z.array(z.string()).default([]),
  publishedAt: z.string().optional(),
});
export type ResearchFrontmatter = z.infer<typeof ResearchFrontmatterSchema>;

// 5. Principle Entity Schema
export const PrincipleFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string().optional(),
  status: PublicationStatusSchema.default('published'),
  statement: z.string(),
  evidence: z.array(z.string()).default([]),
  confidence: z.number().min(1).max(5).default(5),
  stage: z.string().optional(),
  exceptions: z.string().optional(),
  publishedAt: z.string().optional(),
});
export type PrincipleFrontmatter = z.infer<typeof PrincipleFrontmatterSchema>;

// 6. Knowledge Entity Schema
export const KnowledgeFrontmatterSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string(),
  date: z.string().optional(),
  status: PublicationStatusSchema.default('published'),
  topic: z.string().optional(),
  summary: z.string().optional(),
  takeaways: z.array(z.string()).default([]),
  definition: z.string().optional(),
  simpleExplanation: z.string().optional(),
  whyItMatters: z.string().optional(),
  stage: z.string().optional(),
  confidence: z.number().min(1).max(5).default(5),
  tags: z.array(z.string()).default([]),
});
export type KnowledgeFrontmatter = z.infer<typeof KnowledgeFrontmatterSchema>;

// 7. Roadmap Stage Schema
export const RoadmapTopicSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: z.enum(['not_started', 'learning', 'practicing', 'understood', 'mastered']),
});
export type RoadmapTopic = z.infer<typeof RoadmapTopicSchema>;

export const RoadmapStageSchema = z.object({
  id: z.string(),
  number: z.string(),
  title: z.string(),
  tagline: z.string(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  progress: z.number().min(0).max(100),
  topics: z.array(RoadmapTopicSchema),
  evidenceCount: z.number().default(0),
});
export type RoadmapStage = z.infer<typeof RoadmapStageSchema>;

// 8. Skill Schema
export const SkillSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.string(),
  level: z.number().min(1).max(5),
  targetLevel: z.number().min(1).max(5),
  confidence: z.number().min(1).max(5),
  lastPracticed: z.string(),
  description: z.string(),
});
export type Skill = z.infer<typeof SkillSchema>;

// 9. Goal Schema
export const GoalSchema = z.object({
  id: z.string(),
  title: z.string(),
  type: z.enum(['stage', 'project', 'skill', 'experiment', 'long_term']),
  status: z.enum(['not_started', 'in_progress', 'completed']),
  targetDate: z.string(),
  progress: z.number().min(0).max(100),
  measurableOutcome: z.string(),
  relatedStage: z.string().optional(),
});
export type Goal = z.infer<typeof GoalSchema>;

// 10. Learning Record Schema
export const LearningRecordSchema = z.object({
  id: z.string(),
  date: z.string(),
  stageId: z.string(),
  stageName: z.string(),
  topic: z.string(),
  skillId: z.string().optional(),
  durationMinutes: z.number().default(60),
  confidence: z.number().min(1).max(5).default(3),
  difficulty: z.enum(['easy', 'medium', 'hard']).default('medium'),
  notes: z.string(),
  takeaway: z.string().optional(),
  resources: z.array(z.string()).default([]),
});
export type LearningRecord = z.infer<typeof LearningRecordSchema>;

// 11. Generic Content Item Container
export interface ContentItem<T> {
  frontmatter: T;
  content: string;
  slug: string;
  filePath: string;
}
