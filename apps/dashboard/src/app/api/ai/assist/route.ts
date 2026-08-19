import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { synthesizeArticleFromNotes, suggestNextTopics } from '@/lib/ai';
import { RoadmapStage } from '@xrlab/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, topic, notes, takeaway, stageName } = body;

    if (action === 'note_to_article') {
      const article = synthesizeArticleFromNotes(topic || 'Spatial Exploration', notes || '', takeaway, stageName);
      return NextResponse.json({ success: true, data: article });
    }

    if (action === 'suggest_next_topics') {
      const stagesPath = path.join(process.cwd(), '../../data/roadmap/stages.json');
      const stages: RoadmapStage[] = fs.existsSync(stagesPath) ? JSON.parse(fs.readFileSync(stagesPath, 'utf-8')) : [];
      const suggestions = suggestNextTopics(stages);
      return NextResponse.json({ success: true, data: suggestions });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
