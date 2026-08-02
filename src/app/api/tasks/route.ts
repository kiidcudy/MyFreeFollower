import { NextResponse } from "next/server";
import {
  isBlobReady,
  blobEnvKeys,
  getTasks,
  setTasks,
  getProofs,
  checkAdminPassword,
} from "@/lib/kv";
import type { Task } from "@/lib/tasks/data";

export const dynamic = "force-dynamic";

async function getTaskCounts(): Promise<Record<string, number>> {
  const proofs = await getProofs();
  const counts: Record<string, number> = {};
  for (const p of proofs) {
    if (p.status === "rejected" || p.status === "needs_edit") continue;
    counts[p.taskId] = (counts[p.taskId] ?? 0) + 1;
  }
  return counts;
}

export async function GET(req: Request) {
  if (!isBlobReady()) {
    return NextResponse.json({ tasks: [], kv: false, envKeys: blobEnvKeys() });
  }

  const tasks = await getTasks();
  const counts = await getTaskCounts();

  if (checkAdminPassword(req)) {
    const withCount = tasks.map((t) => ({ ...t, count: counts[t.id] ?? 0 }));
    return NextResponse.json({ tasks: withCount, kv: true, envKeys: blobEnvKeys() });
  }

  const open = tasks
    .filter((t) => !t.limit || t.limit <= 0 || (counts[t.id] ?? 0) < t.limit)
    .map((t) => {
      const pub: Task = { ...t };
      delete pub.limit;
      delete pub.count;
      return pub;
    });

  return NextResponse.json({ tasks: open, kv: true, envKeys: blobEnvKeys() });
}

export async function POST(req: Request) {
  if (!isBlobReady()) {
    return NextResponse.json(
      {
        error:
          "Vercel Blob yapılandırılmamış. Storage → Blob store projeye bağlı mı? BLOB_STORE_ID veya BLOB_READ_WRITE_TOKEN gerekli. Sonra Redeploy.",
      },
      { status: 503 },
    );
  }
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await req.json()) as Task & { update?: boolean };
  if (!body?.title) {
    return NextResponse.json({ error: "Invalid task." }, { status: 400 });
  }

  try {
    const tasks = await getTasks();

    if (body.update && body.id) {
      const idx = tasks.findIndex((t) => String(t.id) === String(body.id));
      if (idx >= 0) {
        const { update: _u, count: _c, ...rest } = body;
        tasks[idx] = { ...tasks[idx], ...rest, id: tasks[idx].id };
        await setTasks(tasks);
        return NextResponse.json({ ok: true, tasks });
      }
    }

    const maxId = tasks.reduce((m, t) => {
      const n = parseInt(String(t.id), 10);
      return Number.isFinite(n) && n > m ? n : m;
    }, 257834);

    const { update: _u2, count: _c2, ...taskData } = body;
    const task: Task = { ...taskData, id: String(maxId + 1) };
    tasks.unshift(task);
    await setTasks(tasks);
    return NextResponse.json({ ok: true, tasks });
  } catch (e) {
    return NextResponse.json(
      { error: `Write error: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  if (!isBlobReady()) {
    return NextResponse.json({ error: "Blob env missing." }, { status: 503 });
  }
  if (!checkAdminPassword(req)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id, all } = (await req.json()) as { id?: string; all?: boolean };
  try {
    const tasks = all === true ? [] : (await getTasks()).filter((t) => t.id !== id);
    await setTasks(tasks);
    return NextResponse.json({ ok: true, tasks });
  } catch (e) {
    return NextResponse.json(
      { error: `Delete error: ${e instanceof Error ? e.message : String(e)}` },
      { status: 500 }
    );
  }
}
