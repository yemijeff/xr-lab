import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { RoadmapStage } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const STAGES_FILE = path.join(process.cwd(), '../../data/roadmap/stages.json');

function getStages(): RoadmapStage[] {
  if (!fs.existsSync(STAGES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(STAGES_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export async function GET() {
  const stages = getStages();
  return NextResponse.json({ success: true, data: stages });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { stageId, topicId, status } = body;

    const stages = getStages();
    const stageIndex = stages.findIndex((s) => s.id === stageId);

    if (stageIndex === -1) {
      return NextResponse.json({ success: false, error: 'Stage not found' }, { status: 404 });
    }

    const stage = stages[stageIndex];
    const topic = stage.topics.find((t) => t.id === topicId);

    if (topic) {
      topic.status = status;
    }

    // Recompute stage progress percentage
    const completedTopics = stage.topics.filter(
      (t) => t.status === 'mastered' || t.status === 'understood'
    ).length;
    stage.progress = Math.round((completedTopics / stage.topics.length) * 100);

    if (stage.progress === 100) {
      stage.status = 'completed';
    } else if (stage.progress > 0) {
      stage.status = 'in_progress';
    }

    stages[stageIndex] = stage;
    const jsonString = JSON.stringify(stages, null, 2);

    const saveResult = await saveProjectFile(
      'data/roadmap/stages.json',
      jsonString,
      `roadmap: update ${topic?.name || topicId} to ${status}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: stages, mode: saveResult.mode });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
