import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { LearningRecordSchema } from '@xrlab/types';
import { saveProjectFile } from '@/lib/githubSync';

const DATA_FILE_PATH = path.join(process.cwd(), '../../data/learning/records.json');

function getRecords() {
  if (!fs.existsSync(DATA_FILE_PATH)) {
    return [];
  }
  const fileContent = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export async function GET() {
  const records = getRecords();
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
    const records = getRecords();
    const updatedRecords = [newRecord, ...records];
    const jsonString = JSON.stringify(updatedRecords, null, 2);

    const saveResult = await saveProjectFile(
      'data/learning/records.json',
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
