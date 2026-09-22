import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { Goal } from '@xrlab/types';
import { saveProjectFile, getProjectJson } from '@/lib/githubSync';

const RELATIVE_PATH = 'data/goals/goals.json';
const LOCAL_FILE_PATH = path.join(process.cwd(), '../../', RELATIVE_PATH);

async function getGoals(): Promise<Goal[]> {
  const goals = await getProjectJson<Goal[]>(RELATIVE_PATH, LOCAL_FILE_PATH);
  return Array.isArray(goals) ? goals : [];
}

export async function GET() {
  const goals = await getGoals();
  return NextResponse.json({ success: true, data: goals });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { goalId, status, progress } = body;

    const goals = await getGoals();
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
      RELATIVE_PATH,
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
