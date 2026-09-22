import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { Skill } from '@xrlab/types';
import { saveProjectFile, getProjectJson } from '@/lib/githubSync';

const RELATIVE_PATH = 'data/skills/skills.json';
const LOCAL_FILE_PATH = path.join(process.cwd(), '../../', RELATIVE_PATH);

async function getSkills(): Promise<Skill[]> {
  const skills = await getProjectJson<Skill[]>(RELATIVE_PATH, LOCAL_FILE_PATH);
  return Array.isArray(skills) ? skills : [];
}

export async function GET() {
  const skills = await getSkills();
  return NextResponse.json({ success: true, data: skills });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skillId, level, confidence } = body;

    const skills = await getSkills();
    const skillIndex = skills.findIndex((s) => s.id === skillId);

    if (skillIndex === -1) {
      return NextResponse.json({ success: false, error: 'Skill not found' }, { status: 404 });
    }

    const skill = skills[skillIndex];
    if (level !== undefined) skill.level = level;
    if (confidence !== undefined) skill.confidence = confidence;
    skill.lastPracticed = new Date().toISOString().slice(0, 10);

    skills[skillIndex] = skill;
    const jsonString = JSON.stringify(skills, null, 2);

    const saveResult = await saveProjectFile(
      RELATIVE_PATH,
      jsonString,
      `skills: level up ${skill.name} to Level ${skill.level}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: skills, mode: saveResult.mode });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
