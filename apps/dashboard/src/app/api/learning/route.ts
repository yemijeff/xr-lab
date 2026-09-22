import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import { LearningRecordSchema, LearningRecord } from '@xrlab/types';
import { saveProjectFile, getProjectJson } from '@/lib/githubSync';

const RELATIVE_PATH = 'data/learning/records.json';
const LOCAL_FILE_PATH = path.join(process.cwd(), '../../', RELATIVE_PATH);

async function getRecords(): Promise<LearningRecord[]> {
  const records = await getProjectJson<LearningRecord[]>(RELATIVE_PATH, LOCAL_FILE_PATH);
  return Array.isArray(records) ? records : [];
}

export async function GET() {
  const records = await getRecords();
  return NextResponse.json({ success: true, data: records });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const id = `lrn-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Date.now().toString().slice(-4)}`;
    
    const parseResult = LearningRecordSchema.safeParse({
      ...body,
      id: body.id || id,
      date: body.date || new Date().toISOString().slice(0, 10),
    });

    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, errors: parseResult.error.format() },
        { status: 400 }
      );
    }

    const newRecord = parseResult.data;
    const records = await getRecords();
    const updatedRecords = [newRecord, ...records];
    const jsonString = JSON.stringify(updatedRecords, null, 2);

    const saveResult = await saveProjectFile(
      RELATIVE_PATH,
      jsonString,
      `log(learning): ${newRecord.topic}`
    );

    if (!saveResult.success) {
      return NextResponse.json({ success: false, error: saveResult.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: newRecord, mode: saveResult.mode }, { status: 201 });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
