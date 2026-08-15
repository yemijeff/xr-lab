import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';
import { ContentItem } from '@xrlab/types';

/**
 * Reads and validates all Markdown files from a given directory using a provided Zod schema.
 */
export function readContentDirectory<T>(
  dirPath: string,
  schema: z.ZodType<T>,
  options?: { onlyPublished?: boolean }
): ContentItem<T>[] {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const fileNames = fs.readdirSync(dirPath).filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
  const items: ContentItem<T>[] = [];

  for (const fileName of fileNames) {
    const fullPath = path.join(dirPath, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const parseResult = schema.safeParse(data);
    if (!parseResult.success) {
      console.warn(`[Content Validation Error] File: ${fileName}`, parseResult.error.format());
      continue;
    }

    const frontmatter = parseResult.data;

    // Filter by published status if requested
    if (options?.onlyPublished) {
      const status = (frontmatter as Record<string, unknown>).status;
      if (status !== 'published') {
        continue;
      }
    }

    const slug = (frontmatter as Record<string, unknown>).slug as string || fileName.replace(/\.(md|mdx)$/, '');

    items.push({
      frontmatter,
      content,
      slug,
      filePath: fullPath,
    });
  }

  return items;
}

/**
 * Reads and validates a single content file by slug.
 */
export function readContentBySlug<T>(
  dirPath: string,
  slug: string,
  schema: z.ZodType<T>
): ContentItem<T> | null {
  const items = readContentDirectory(dirPath, schema);
  return items.find((item) => item.slug === slug) || null;
}
