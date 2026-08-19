import { LearningRecord, RoadmapStage, Skill } from '@xrlab/types';

/**
 * Intelligent spatial design article synthesizer.
 * Transforms raw bullet points and notes into a structured, editorial essay.
 */
export function synthesizeArticleFromNotes(topic: string, notes: string, takeaway?: string, stageName?: string): {
  title: string;
  summary: string;
  content: string;
  tags: string[];
} {
  const title = topic.startsWith('Foundations') || topic.startsWith('Understanding')
    ? topic
    : `Spatial Design Insights: ${topic}`;

  const summary = takeaway || `An in-depth reflection exploring ${topic.toLowerCase()}, analyzing ergonomic constraints, depth planes, and spatial UX mental models.`;

  const content = `# ${title}

*Reflections and spatial design breakdown from ${stageName || 'XR Foundations'}.*

## 1. Overview & Context
When transitioning from 2D pixel grids into spatial computing, the primary challenge is moving from screen-bound layouts to physical, volumetric volumes. In exploring **${topic}**, the focus is understanding how physical comfort and cognitive ergonomics dictate spatial UI.

---

## 2. Core Notes & Synthesis
${notes}

---

## 3. Spatial UX & Ergonomic Implications
- **Viewing Envelope:** High-frequency UI must reside within the resting vergence comfort zone (1.0m to 2.0m) to minimize accommodation conflict.
- **Anchoring Strategy:** Choosing between *World-Locked* (environment permanence), *Body-Locked* (quick access palettes), and *Head-Locked* (critical alerts only) prevents visual fatigue.
- **Translational Motion Parallax:** In 6DoF headsets, users naturally shift position. Interfaces must maintain perceptual stability across lateral head movements.

---

## 4. Key Spatial Takeaway
> **${takeaway || 'Always validate interfaces inside a 6DoF headset rather than flat 2D artboards.'}**
`;

  return {
    title,
    summary,
    content,
    tags: ['spatial-ux', 'xr-foundations', 'interaction-design', 'ergonomics'],
  };
}

/**
 * Generates recommendations for the next learning topics based on current roadmap state.
 */
export function suggestNextTopics(stages: RoadmapStage[]): {
  recommendations: Array<{ title: string; stage: string; rationale: string; prototypeIdea: string }>;
} {
  const currentStage = stages.find((s) => s.status === 'in_progress') || stages[0];
  const unstartedTopics = currentStage?.topics.filter((t) => t.status === 'not_started') || [];

  const recommendations = unstartedTopics.slice(0, 3).map((topic) => ({
    title: topic.name,
    stage: currentStage?.title || 'XR Foundations',
    rationale: `Mastering ${topic.name} is key to completing Stage ${currentStage?.number || '01'} and understanding core spatial realities.`,
    prototypeIdea: `Build a micro-prototype in Unity or WebXR testing ${topic.name.toLowerCase()} with hand tracking and depth cues.`,
  }));

  if (recommendations.length === 0) {
    recommendations.push({
      title: 'Multimodal Gaze and Pinch Interaction',
      stage: '03 XR Interaction',
      rationale: 'Transition from spatial fundamentals to direct hand and eye tracking selection mechanics.',
      prototypeIdea: 'Prototype a virtual object grab with physics damping and haptic feedback.',
    });
  }

  return { recommendations };
}
