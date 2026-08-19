import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Goal } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const GOALS_FILE = path.join(process.cwd(), '../../data/goals/goals.json');

function getGoals(): Goal[] {
  if (!fs.existsSync(GOALS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(GOALS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export async function GET() {
  const goals = getGoals();
  return NextResponse.json({ success: true, data: goals });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goalId, status, progress } = body;

    const goals = getGoals();
    const goalIndex = goals.findIndex((g) => g.id === goalId);

    if (goalIndex === -1) {
      return NextResponse.json({ success: false, error: 'Goal not found' }, { status: 404 });
    }

    const goal = goals[goalIndex];
    if (status !== undefined) goal.status = status;
    if (progress !== undefined) goal.progress = progress;

    goals[goalIndex] = goal;
    const jsonString = JSON.stringify(goals, null, 2);

    const saveResult = await saveProjectFile(
      'data/goals/goals.json',
      jsonString,
      `goals: update ${goal.title} status to ${goal.status}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: goals, mode: saveResult.mode });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
