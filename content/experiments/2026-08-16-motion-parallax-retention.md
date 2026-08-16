---
id: "exp-001"
title: "Testing Motion Parallax & 6DoF Menu Retention"
slug: "motion-parallax-6dof-menu-retention"
date: "2026-08-16"
status: "published"
stage: "01-xr-foundations"
question: "How does 6DoF translational motion parallax alter spatial menu retention?"
hypothesis: "World-anchored menus with subtle depth cues maintain orientation 50% better than body-locked menus."
skills:
  - "spatial-ux"
  - "spatial-ergonomics"
tools:
  - "Unity"
  - "XR Interaction Toolkit"
result: "Translational head movement around world-anchored panels created strong perceptual stability without cybersickness."
whatWorked: "Using a 1.5-meter distance with 120ms inertia follow damping."
whatFailed: "Direct head-locking caused visual fatigue and peripheral blind-spots during rotation."
whatWasLearned: "Spatial interfaces must respect the resting vergence-accommodation envelope (1.5m to 2.0m)."
images: []
videos: []
prototypeLinks: []
githubLinks: []
coverImage: ""
publishedAt: "2026-08-16T12:00:00Z"
---

# Experiment 001: Testing Motion Parallax & 6DoF Menu Retention

## Objective
Investigate how users maintain spatial orientation when interacting with world-locked UI elements versus head-locked panels in virtual reality.

## Approach
Built a prototype scene with 3 menu configurations:
1. Strict head-locked (HUD style)
2. World-locked static (placed at 1.5m)
3. Lazy-follow world-locked with 300ms smoothing delay

## Observations
- Head-locked UI caused noticeable eye strain within 3 minutes of active head rotation.
- Lazy-follow gave the feeling of physical presence while keeping critical actions within comfortable reach.
