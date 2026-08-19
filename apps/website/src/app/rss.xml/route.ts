import { NextResponse } from 'next/server';
import path from 'path';
import { readContentDirectory } from '@xrlab/content';
import { JournalFrontmatterSchema, JournalFrontmatter } from '@xrlab/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://xr-lab.vercel.app';

export async function GET() {
  const dir = path.join(process.cwd(), '../../content/journal');
  const entries = readContentDirectory<JournalFrontmatter>(dir, JournalFrontmatterSchema, { onlyPublished: true });

  const rssItems = entries
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.frontmatter.title}]]></title>
      <link>${SITE_URL}/journal/${item.slug}</link>
      <guid>${SITE_URL}/journal/${item.slug}</guid>
      <pubDate>${new Date(item.frontmatter.date).toUTCString()}</pubDate>
      <description><![CDATA[${item.frontmatter.summary || ''}]]></description>
    </item>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>XR Lab — Spatial Design Journal</title>
    <link>${SITE_URL}</link>
    <description>Documenting the journey from Product Designer to Spatial / XR Designer.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
