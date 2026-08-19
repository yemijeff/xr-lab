import { NextResponse } from 'next/server';
import path from 'path';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter, ExperimentFrontmatterSchema, ExperimentFrontmatter, ProjectFrontmatterSchema, ProjectFrontmatter } from '@xrlab/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xr-lab.vercel.app';

export async function GET() {
  const root = process.cwd();
  const journals = readContentDirectory<JournalFrontmatter>(path.join(root, '../../content/journal'), JournalFrontmatterSchema, { onlyPublished: true });
  const experiments = readContentDirectory<ExperimentFrontmatter>(path.join(root, '../../content/experiments'), ExperimentFrontmatterSchema, { onlyPublished: true });
  const projects = readContentDirectory<ProjectFrontmatter>(path.join(root, '../../content/projects'), ProjectFrontmatterSchema, { onlyPublished: true });

  const staticRoutes = ['', '/journey', '/experiments', '/projects', '/journal', '/research', '/principles', '/about'];

  const staticUrls = staticRoutes
    .map(
      (route) => `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <changefreq>daily</changefreq>
      <priority>${route === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('');

  const dynamicUrls = [
    ...journals.map((j) => `/journal/${j.slug}`),
    ...experiments.map((e) => `/experiments/${e.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
  ]
    .map(
      (route) => `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticUrls}
  ${dynamicUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
