// Type-only contract for the Coach v2 UI message shape.
//
// The backend `coachTools` factory in `voicefit/lib/coach/tools.ts` defines the
// tools with their executors and Prisma queries. We can't import that factory
// here (contracts has no Prisma dep, and shouldn't), so we mirror the *input*
// schemas of every tool below — just enough for the UI to know that each tool
// part has `input.label` (and any other field a UI surface may eventually
// inspect). Outputs are typed `unknown` because the mobile UI doesn't render
// them today.
//
// If the backend tool inputs change, this file must be updated in lockstep.
// Type-mismatch detection happens implicitly: the mobile screen reads
// `part.input.label`, so a missing/renamed field there will break the build.

import { tool, type InferUITools, type UIDataTypes, type UIMessage } from "ai";
import { z } from "zod";

const labelField = z.string();

const coachToolInputs = {
  query_meals: tool({
    inputSchema: z.object({
      label: labelField,
      start_date: z.string(),
      end_date: z.string(),
      meal_type: z.enum(["breakfast", "lunch", "dinner", "snack"]).optional(),
      limit: z.number().int().min(1).max(200).default(50),
    }),
  }),
  query_workout_sessions: tool({
    inputSchema: z.object({
      label: labelField,
      start_date: z.string(),
      end_date: z.string(),
      limit: z.number().int().min(1).max(100).default(20),
    }),
  }),
  query_workout_sets: tool({
    inputSchema: z.object({
      label: labelField,
      start_date: z.string(),
      end_date: z.string(),
      exercise_name: z.string().optional(),
      session_id: z.string().optional(),
      limit: z.number().int().min(1).max(500).default(200),
    }),
  }),
  query_metrics: tool({
    inputSchema: z.object({
      label: labelField,
      start_date: z.string(),
      end_date: z.string(),
    }),
  }),
  compare_periods: tool({
    inputSchema: z.object({
      label: labelField,
      metric: z.enum([
        "calories",
        "protein",
        "steps",
        "weight_avg",
        "workout_count",
        "training_volume_kg",
      ]),
      range_a: z.object({ start: z.string(), end: z.string() }),
      range_b: z.object({ start: z.string(), end: z.string() }),
    }),
  }),
  workout_consistency: tool({
    inputSchema: z.object({
      label: labelField,
      weeks: z.number().int().min(1).max(26),
    }),
  }),
  exercise_progression: tool({
    inputSchema: z.object({
      label: labelField,
      exercise_name: z.string(),
      weeks: z.number().int().min(1).max(52),
    }),
  }),
  daily_summary: tool({
    inputSchema: z.object({
      label: labelField,
      start_date: z.string(),
      end_date: z.string().optional(),
    }),
  }),
  save_user_fact: tool({
    inputSchema: z.object({
      label: labelField,
      category: z.enum([
        "goal",
        "dietary",
        "injury",
        "preference",
        "training_history",
        "other",
      ]),
      fact: z.string(),
    }),
  }),
};

export type CoachUITools = InferUITools<typeof coachToolInputs>;

/**
 * Type-safe UIMessage for the VoiceFit Coach v2.
 *
 * - METADATA: `unknown` — coach messages don't carry custom metadata today
 * - DATA_PARTS: `UIDataTypes` (the SDK default) — no custom data parts in use
 * - TOOLS: `CoachUITools` — gives `part.input.label` static type-safety on tool parts
 */
export type CoachUIMessage = UIMessage<unknown, UIDataTypes, CoachUITools>;
