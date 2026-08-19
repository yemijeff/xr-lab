import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Skill } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const SKILLS_FILE = path.join(process.cwd(), '../../data/skills/skills.json');

function getSkills(): Skill[] {
  if (!fs.existsSync(SKILLS_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(SKILLS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

export async function GET() {
  const skills = getSkills();
  return NextResponse.json({ success: true, data: skills });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { skillId, level, confidence, note } = body;

    const skills = getSkills();
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
      'data/skills/skills.json',
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
