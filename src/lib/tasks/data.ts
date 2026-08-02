// Task types — all tasks come from admin panel / Blob storage.

export type Platform = string;
export type TaskType = string;

export interface Task {
  id: string;
  platform: Platform;
  type: TaskType;
  title: string;
  basePoints: number;
  url: string;
  instructions: string;
  limit?: number;
  count?: number;
}

/** Legacy demo task IDs seeded at build time — stripped from client cache only. */
export const legacyDemoTaskIds = new Set([
  "257835",
  "257836",
  "257837",
  "257838",
  "257839",
  "257840",
  "257841",
]);

/** First auto-assigned task id is NEW_TASK_ID_FLOOR + 1 (must stay above legacy demo ids). */
export const NEW_TASK_ID_FLOOR = 257841;

export function findTask(id: string, tasks: Task[] = []): Task | undefined {
  return tasks.find((t) => t.id === id);
}
