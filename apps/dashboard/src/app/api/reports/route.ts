import { NextResponse } from 'next/server';
import path from 'path';
import { LearningRecord, RoadmapStage, Skill } from '@xrlab/types';
import { getProjectJson } from '@/lib/githubSync';

async function loadData() {
  const root = process.cwd();
  const logsPath = path.join(root, '../../data/learning/records.json');
  const stagesPath = path.join(root, '../../data/roadmap/stages.json');
  const skillsPath = path.join(root, '../../data/skills/skills.json');

  const logs = await getProjectJson<LearningRecord[]>('data/learning/records.json', logsPath) || [];
  const stages = await getProjectJson<RoadmapStage[]>('data/roadmap/stages.json', stagesPath) || [];
  const skills = await getProjectJson<Skill[]>('data/skills/skills.json', skillsPath) || [];

  return {
    logs: Array.isArray(logs) ? logs : [],
    stages: Array.isArray(stages) ? stages : [],
    skills: Array.isArray(skills) ? skills : [],
  };
}

export async function GET() {
  try {
    const { logs, stages, skills } = await loadData();

    const totalMinutes = logs.reduce((acc, l) => acc + (l.durationMinutes || 0), 0);
    const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

    const completedTopicsCount = stages.reduce(
      (acc, s) => acc + s.topics.filter((t) => t.status === 'mastered' || t.status === 'understood').length,
      0
    );

    const activeStage = stages.find((s) => s.status === 'in_progress') || stages[0];

    const takeaways = logs
      .map((l) => l.takeaway)
      .filter((t): t is string => Boolean(t));

    const reportMarkdown = `# 🥽 XR Lab Monthly Synthesis Report
Generated on: ${new Date().toISOString().slice(0, 10)}

## 1. Executive Summary
- **Total Dedicated XR Study Time:** ${totalHours} hours across ${logs.length} logged sessions.
- **Active Stage:** ${activeStage?.number || '01'} — ${activeStage?.title || 'XR Foundations'} (${activeStage?.progress || 0}% completed).
- **Total Mastered Topics:** ${completedTopicsCount} topics across roadmap.

---

## 2. Core Spatial Takeaways Synthesized
${takeaways.length > 0 ? takeaways.map((t, idx) => `${idx + 1}. ${t}`).join('\n\n') : '*No takeaways synthesized yet.*'}

---

## 3. Skills Matrix Status
${skills.map((s) => `- **${s.name}:** Level ${s.level}/5 (Confidence: ${s.confidence}/5)`).join('\n')}

---

## 4. Next Milestone Targets
- Complete remaining topics in **${activeStage?.title || 'Stage 01'}**.
- Build next hypothesis-driven prototype experiment.
`;

    return NextResponse.json({
      success: true,
      data: {
        totalHours,
        totalSessions: logs.length,
        completedTopicsCount,
        activeStage: activeStage?.title,
        activeStageProgress: activeStage?.progress,
        takeaways,
        markdown: reportMarkdown,
      },
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
