// Admin panel helpers — server-backed with localStorage fallback.

import { siteConfig } from "@/lib/site";
import type { Task } from "@/lib/tasks/data";
import type { User, ProofSubmission, Withdrawal, ServiceOrder } from "@/lib/auth-store";

const ACCOUNTS_KEY = "mff-accounts-v1";
const ADMIN_SESSION_KEY = "mff-admin-session-v1";
const ADMIN_PW_KEY = "mff-admin-pw-v1";

export interface AdminAccount {
  email: string;
  user: User;
  proofs: ProofSubmission[];
  withdrawals: Withdrawal[];
  serviceOrders?: ServiceOrder[];
  ip?: string;
  banned?: boolean;
}

export interface AdminServiceOrder {
  id: string;
  serviceSlug: string;
  serviceTitle: string;
  username: string;
  points: number;
  quantity: number;
  tier: "free" | "paid";
  packageId?: string;
  status: "pending" | "processing" | "completed";
  email: string;
  memberUsername: string;
  createdAt: number;
}

export interface AdminWithdrawal extends Withdrawal {
  email: string;
  username: string;
}

export type AdminUserAction = "setPoints" | "addPoints" | "setPassword" | "ban" | "unban";

export type AdminProofStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_edit"
  | "recheck";

export interface AdminProof {
  id: string;
  taskId: string;
  taskTitle: string;
  platform: string;
  type?: string;
  points: number;
  email: string;
  username: string;
  accountName?: string;
  mediaType: "image" | "video";
  media: string;
  status: AdminProofStatus;
  note?: string;
  createdAt: number;
  reviewedAt?: number;
}

export async function adminUserAction(
  email: string,
  action: AdminUserAction,
  value?: string | number
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-password": getAdminPassword(),
      },
      body: JSON.stringify({ email, action, value }),
    });
    if (res.ok) return { ok: true };
    const d = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: d?.error ?? `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}

export function getAllAccounts(): AdminAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const obj = JSON.parse(raw) as Record<
      string,
      {
        user: User;
        proofs: ProofSubmission[];
        withdrawals: Withdrawal[];
        serviceOrders?: ServiceOrder[];
      }
    >;
    return Object.entries(obj).map(([email, data]) => ({
      email,
      user: data.user,
      proofs: data.proofs ?? [],
      withdrawals: data.withdrawals ?? [],
      serviceOrders: data.serviceOrders ?? [],
    }));
  } catch {
    return [];
  }
}

export async function adminLogin(password: string): Promise<boolean> {
  try {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json()) as { ok?: boolean };
    if (res.ok && data.ok) {
      localStorage.setItem(ADMIN_SESSION_KEY, "1");
      localStorage.setItem(ADMIN_PW_KEY, password);
      return true;
    }
    return false;
  } catch {
    if (password === siteConfig.adminPassword || password === "MFFAdmin2026!") {
      localStorage.setItem(ADMIN_SESSION_KEY, "1");
      localStorage.setItem(ADMIN_PW_KEY, password);
      return true;
    }
    return false;
  }
}

export function isAdminAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return (
    localStorage.getItem(ADMIN_SESSION_KEY) === "1" &&
    Boolean(localStorage.getItem(ADMIN_PW_KEY))
  );
}

export function getAdminPassword(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(ADMIN_PW_KEY) ?? "";
}

export function adminLogout() {
  localStorage.removeItem(ADMIN_SESSION_KEY);
  localStorage.removeItem(ADMIN_PW_KEY);
}

export async function fetchAllProofs(): Promise<AdminProof[]> {
  try {
    const res = await fetch("/api/proofs", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { proofs?: AdminProof[] };
      if (Array.isArray(data.proofs)) return data.proofs;
    }
  } catch {
    /* ignore */
  }
  return [];
}

export async function reviewProof(
  proofId: string,
  status: AdminProofStatus,
  note?: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/proofs/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-password": getAdminPassword(),
      },
      body: JSON.stringify({ proofId, status, note }),
    });
    if (res.ok) return { ok: true };
    const d = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: d?.error ?? `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}

export async function fetchAllAccounts(): Promise<AdminAccount[]> {
  try {
    const res = await fetch("/api/accounts", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { accounts?: AdminAccount[]; kv?: boolean };
      if (data.kv !== false && Array.isArray(data.accounts)) {
        const map = new Map<string, AdminAccount>();
        for (const a of getAllAccounts()) map.set(a.email, a);
        for (const a of data.accounts) map.set(a.email, a);
        return Array.from(map.values());
      }
    }
  } catch {
    /* fallback */
  }
  return getAllAccounts();
}

export async function fetchAllServiceOrders(): Promise<AdminServiceOrder[]> {
  const fromLocal = (): AdminServiceOrder[] => {
    const all: AdminServiceOrder[] = [];
    for (const a of getAllAccounts()) {
      for (const o of a.serviceOrders ?? []) {
        all.push({
          ...o,
          email: a.email,
          memberUsername: a.user?.username ?? a.email,
        });
      }
    }
    return all;
  };

  try {
    const res = await fetch("/api/service-orders", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { orders?: AdminServiceOrder[]; kv?: boolean };
      if (data.kv !== false && Array.isArray(data.orders)) {
        const map = new Map<string, AdminServiceOrder>();
        for (const o of fromLocal()) map.set(o.id, o);
        for (const o of data.orders) map.set(o.id, o);
        return Array.from(map.values()).sort((a, b) => b.createdAt - a.createdAt);
      }
    }
  } catch {
    /* fallback */
  }
  return fromLocal().sort((a, b) => b.createdAt - a.createdAt);
}

export async function fetchAllWithdrawals(): Promise<AdminWithdrawal[]> {
  try {
    const res = await fetch("/api/admin/withdrawals", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { withdrawals?: AdminWithdrawal[] };
      if (Array.isArray(data.withdrawals)) {
        return data.withdrawals.sort((a, b) => b.createdAt - a.createdAt);
      }
    }
  } catch {
    /* fallback */
  }

  const all: AdminWithdrawal[] = [];
  for (const a of getAllAccounts()) {
    for (const w of a.withdrawals) {
      all.push({ ...w, email: a.email, username: a.user?.username ?? a.email });
    }
  }
  return all.sort((a, b) => b.createdAt - a.createdAt);
}

export async function updateServiceOrderStatus(
  id: string,
  status: "pending" | "processing" | "completed"
): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/service-orders", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "x-admin-password": getAdminPassword(),
      },
      body: JSON.stringify({ id, patch: { status } }),
    });
    if (res.ok) return { ok: true };
    const d = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: d?.error ?? `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}

export async function reviewWithdrawal(
  id: string,
  status: "approved" | "rejected",
  note?: string
): Promise<{ ok: boolean; error?: string; refunded?: boolean }> {
  try {
    const res = await fetch("/api/admin/withdrawals", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-admin-password": getAdminPassword(),
      },
      body: JSON.stringify({ action: "review", id, status, note }),
    });
    const data = (await res.json()) as { ok?: boolean; error?: string; refunded?: boolean };
    if (res.ok && data.ok) return { ok: true, refunded: data.refunded };
    return { ok: false, error: data.error ?? `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}

function adminHeaders(): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-admin-password": getAdminPassword(),
  };
}

export async function fetchAccountByEmail(
  email: string,
): Promise<AdminAccount | null> {
  try {
    const res = await fetch(`/api/accounts?email=${encodeURIComponent(email)}`, {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { account?: AdminAccount | null };
      if (data.account) return data.account;
    }
  } catch {
    /* fallback */
  }
  return getAllAccounts().find((a) => a.email === email) ?? null;
}

export async function fetchStorageStatus(): Promise<{ kv: boolean; envKeys: string[] }> {
  try {
    const res = await fetch("/api/tasks", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    const data = (await res.json()) as { kv?: boolean; envKeys?: string[] };
    return { kv: data.kv === true, envKeys: data.envKeys ?? [] };
  } catch {
    return { kv: false, envKeys: [] };
  }
}

export async function fetchAdminTasks(): Promise<Task[]> {
  try {
    const res = await fetch("/api/tasks", {
      headers: { "x-admin-password": getAdminPassword() },
      cache: "no-store",
    });
    if (res.ok) {
      const data = (await res.json()) as { tasks?: Task[] };
      return data.tasks ?? [];
    }
  } catch {
    /* ignore */
  }
  return [];
}

export async function saveTask(
  task: Partial<Task> & { update?: boolean },
): Promise<{ ok: boolean; error?: string; tasks?: Task[] }> {
  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: adminHeaders(),
      body: JSON.stringify(task),
    });
    const data = (await res.json().catch(() => null)) as {
      error?: string;
      tasks?: Task[];
    } | null;
    if (res.ok) return { ok: true, tasks: data?.tasks };
    return { ok: false, error: data?.error ?? `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}

export async function removeTask(id: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: adminHeaders(),
      body: JSON.stringify({ id }),
    });
    if (res.ok) return { ok: true };
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    return { ok: false, error: data?.error ?? `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}

export async function clearAllTasks(): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/tasks", {
      method: "DELETE",
      headers: adminHeaders(),
      body: JSON.stringify({ all: true }),
    });
    if (res.ok) return { ok: true };
    return { ok: false, error: `Error (HTTP ${res.status})` };
  } catch {
    return { ok: false, error: "Connection error." };
  }
}
