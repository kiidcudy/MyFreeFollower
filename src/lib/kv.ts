// Server-side persistence — Vercel Blob (private store).
// Prefix: mff/ — accounts, tasks, proofs, service-orders, withdrawals.

import { put, list, get } from "@vercel/blob";
import { siteConfig } from "@/lib/site";
import { legacyDemoTaskIds, type Task } from "@/lib/tasks/data";

function resolveToken(): string {
  if (process.env.BLOB_READ_WRITE_TOKEN) return process.env.BLOB_READ_WRITE_TOKEN;
  const key = Object.keys(process.env).find(
    (k) => k.toUpperCase().endsWith("READ_WRITE_TOKEN") && process.env[k]
  );
  return key ? (process.env[key] as string) : "";
}

function hasOidcBlobAuth(): boolean {
  return Boolean(process.env.BLOB_STORE_ID?.trim());
}

/** Vercel Blob auth: OIDC (BLOB_STORE_ID) on Vercel, or BLOB_READ_WRITE_TOKEN fallback. */
export function isBlobReady(): boolean {
  return hasOidcBlobAuth() || Boolean(resolveToken());
}

export function blobEnvKeys(): string[] {
  return Object.keys(process.env).filter((k) => {
    const u = k.toUpperCase();
    return u.includes("BLOB") || u.endsWith("READ_WRITE_TOKEN") || u === "VERCEL_OIDC_TOKEN";
  });
}

/** Only pass an explicit token outside Vercel OIDC — empty token blocks SDK auto-auth. */
function blobAuthOptions(): { token?: string } {
  const token = resolveToken();
  if (token && !hasOidcBlobAuth()) return { token };
  return {};
}

const TASKS_PATH = "mff/tasks.json";
const ACCOUNTS_PREFIX = "mff/accounts/";
const PROOFS_PATH = "mff/proofs.json";
const SERVICE_ORDERS_PATH = "mff/service-orders.json";
const WITHDRAWALS_PATH = "mff/withdrawals.json";

// ---- Password (demo — simple hash, plain fallback) ----

export function hashPassword(password: string): string {
  let h = 0;
  for (let i = 0; i < password.length; i++) {
    h = (Math.imul(31, h) + password.charCodeAt(i)) | 0;
  }
  return `mff_${Math.abs(h).toString(36)}_${password.length}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  if (!stored) return false;
  if (stored.startsWith("mff_")) return hashPassword(password) === stored;
  return stored === password;
}

export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "";
}

export function checkAdminPassword(req: Request): boolean {
  const pw = req.headers.get("x-admin-password") ?? "";
  const expected = process.env.ADMIN_PASSWORD || "MFFAdmin2026!";
  return pw.length > 0 && pw === expected;
}

async function readJSON<T>(pathname: string, fallback: T): Promise<T> {
  try {
    const result = await get(pathname, {
      access: "private",
      useCache: false,
      ...blobAuthOptions(),
    });
    if (!result?.stream) return fallback;
    const text = await new Response(result.stream).text();
    if (!text) return fallback;
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

async function writeJSON(pathname: string, data: unknown): Promise<void> {
  await put(pathname, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    ...blobAuthOptions(),
  });
}

export { readJSON, writeJSON };

// ---- Types ----

export interface AccountUser {
  username: string;
  fullName?: string;
  email: string;
  points: number;
  todayEarned: number;
  todayEarnedDate?: string;
  refCode: string;
  invitedBy?: string;
  lastBonusClaim?: string;
  lifetimeEarned?: number;
  createdAt: number;
}

export interface Account {
  email: string;
  username?: string;
  password?: string;
  ip?: string;
  banned?: boolean;
  provider?: string;
  emailVerified?: boolean;
  user?: AccountUser;
  proofs?: Proof[];
  withdrawals?: Withdrawal[];
  serviceOrders?: ServiceOrder[];
  lastLogin?: number;
}

export interface ServerAccount {
  email: string;
  user: AccountUser | null;
  proofs: Proof[];
  withdrawals: Withdrawal[];
  ip?: string;
  banned?: boolean;
}

export type ProofStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_edit"
  | "recheck";

export interface Proof {
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
  status: ProofStatus;
  note?: string;
  awarded?: boolean;
  createdAt: number;
  reviewedAt?: number;
}

export interface ServiceOrder {
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

export interface Withdrawal {
  id: string;
  email: string;
  username: string;
  method: "PayPal" | "Crypto" | "Bank Transfer" | "Gift Card";
  amountPoints: number;
  /** Withdrawal fiat value at 100 pts = 1 ₺ */
  amountMoney: number;
  /** @deprecated legacy field — same as amountMoney */
  amountUSD?: number;
  destination: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
  reviewedAt?: number;
  note?: string;
}

export interface AuthResult {
  ok: boolean;
  user?: AccountUser;
  email?: string;
  error?: string;
  banned?: boolean;
  reason?: "notfound" | "invalid";
}

export type AdminUserAction = "setPoints" | "addPoints" | "setPassword" | "ban" | "unban";

// ---- Tasks ----

export async function getTasks(): Promise<Task[]> {
  const t = await readJSON<Task[]>(TASKS_PATH, []);
  if (!Array.isArray(t)) return [];
  const tasks = t.filter((task) => !legacyDemoTaskIds.has(String(task.id)));
  if (tasks.length !== t.length) {
    await setTasks(tasks);
  }
  return tasks;
}

export async function setTasks(tasks: Task[]): Promise<void> {
  await writeJSON(TASKS_PATH, tasks);
}

export async function getTaskById(id: string): Promise<Task | undefined> {
  const tasks = await getTasks();
  return tasks.find((t) => t.id === id);
}

// ---- Accounts ----

function emailToPath(email: string): string {
  const safe = email.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `${ACCOUNTS_PREFIX}${safe}.json`;
}

export async function saveAccount(email: string, data: Partial<Account>): Promise<void> {
  const existing = await readJSON<Account>(emailToPath(email), { email });
  await writeJSON(emailToPath(email.toLowerCase()), {
    ...existing,
    email: email.toLowerCase(),
    ...data,
  });
}

export async function upsertAccount(email: string, data: unknown): Promise<void> {
  await saveAccount(email, data as Partial<Account>);
}

async function readAccountRaw(email: string): Promise<Account | null> {
  return readJSON<Account | null>(emailToPath(email.toLowerCase()), null);
}

export async function getAccount(email: string): Promise<ServerAccount | null> {
  const d = await readJSON<Account | null>(emailToPath(email.toLowerCase()), null);
  if (!d) return null;
  return {
    email: d.email ?? email,
    user: (d.user as AccountUser) ?? null,
    proofs: d.proofs ?? [],
    withdrawals: d.withdrawals ?? [],
    ip: d.ip,
    banned: d.banned,
  };
}

export async function listAccounts(): Promise<ServerAccount[]> {
  try {
    const { blobs } = await list({ prefix: ACCOUNTS_PREFIX, ...blobAuthOptions() });
    const results = await Promise.all(
      blobs.map(async (b) => {
        const d = await readJSON<Account | null>(b.pathname, null);
        if (!d) return null;
        return {
          email: d.email,
          user: (d.user as AccountUser) ?? null,
          proofs: d.proofs ?? [],
          withdrawals: d.withdrawals ?? [],
          ip: d.ip,
          banned: d.banned,
        } as ServerAccount;
      })
    );
    return results.filter((r): r is ServerAccount => r !== null);
  } catch {
    return [];
  }
}

export const getAllAccountsServer = listAccounts;

function genRefCode(): string {
  return Math.floor(10000000 + Math.random() * 89999999).toString();
}

export async function findAccountByUsername(username: string): Promise<Account | null> {
  const u = username.trim().toLowerCase();
  try {
    const { blobs } = await list({ prefix: ACCOUNTS_PREFIX, ...blobAuthOptions() });
    for (const b of blobs) {
      const d = await readJSON<Account | null>(b.pathname, null);
      const name = (d?.username ?? d?.user?.username ?? "").toLowerCase();
      if (d && name === u) return d;
    }
  } catch {
    /* ignore */
  }
  return null;
}

async function generateUsername(base: string): Promise<string> {
  const cleaned = base.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16) || "user";
  let candidate = cleaned;
  for (let i = 0; i < 5; i++) {
    const taken = await findAccountByUsername(candidate);
    if (!taken) return candidate;
    candidate = cleaned + Math.floor(1000 + Math.random() * 9000);
  }
  return cleaned + Date.now().toString(36).slice(-4);
}

async function creditReferralCommission(earnerEmail: string, points: number): Promise<void> {
  const acc = await readAccountRaw(earnerEmail);
  const invitedBy = acc?.user?.invitedBy;
  if (!invitedBy || points <= 0) return;

  const all = await listAccounts();
  const referrer = all.find((a) => a.user?.refCode === invitedBy);
  if (!referrer?.user) return;

  const commission = Math.floor(points * siteConfig.referralCommissionRate);
  if (commission <= 0) return;

  const raw = await readAccountRaw(referrer.email);
  if (!raw?.user) return;
  raw.user.points = (raw.user.points ?? 0) + commission;
  await writeJSON(emailToPath(referrer.email), raw);
}

export async function registerAccount(input: {
  username: string;
  fullName?: string;
  email: string;
  password: string;
  ref?: string;
  ip?: string;
}): Promise<AuthResult> {
  const email = input.email.trim().toLowerCase();
  const username = input.username.trim();
  const fullName = (input.fullName ?? "").trim();

  const existing = await readAccountRaw(email);
  if (existing?.password) {
    return { ok: false, error: "An account with this email already exists. Try signing in." };
  }

  const taken = await findAccountByUsername(username);
  if (taken) return { ok: false, error: "This username is taken. Choose another one." };

  const user: AccountUser = {
    username,
    fullName,
    email,
    points: 0,
    todayEarned: 0,
    lifetimeEarned: 0,
    refCode: genRefCode(),
    invitedBy: input.ref?.trim() || undefined,
    createdAt: Date.now(),
  };

  await writeJSON(emailToPath(email), {
    email,
    username,
    password: hashPassword(input.password),
    ip: input.ip || "",
    banned: false,
    user,
    withdrawals: [],
  });

  return { ok: true, user, email };
}

export async function loginAccount(
  identifier: string,
  password: string,
  ip?: string
): Promise<AuthResult> {
  const id = identifier.trim();
  const acc = id.includes("@")
    ? await readAccountRaw(id.toLowerCase())
    : await findAccountByUsername(id);

  if (!acc?.password) return { ok: false, reason: "notfound" };
  if (acc.banned) return { ok: false, banned: true };
  if (!verifyPassword(password, acc.password)) return { ok: false, reason: "invalid" };

  acc.ip = ip || acc.ip;
  acc.lastLogin = Date.now();
  await writeJSON(emailToPath(acc.email), acc);
  return { ok: true, user: acc.user!, email: acc.email };
}

export async function upsertGoogleAccount(input: {
  email: string;
  name?: string;
  ref?: string;
  ip?: string;
}): Promise<AuthResult & { created?: boolean }> {
  const email = input.email.trim().toLowerCase();
  const existing = await readAccountRaw(email);

  if (existing) {
    if (existing.banned) return { ok: false, banned: true };
    existing.ip = input.ip || existing.ip;
    existing.lastLogin = Date.now();
    existing.provider = existing.provider || "google";
    existing.emailVerified = true;
    await writeJSON(emailToPath(email), existing);
    return { ok: true, user: existing.user!, email, created: false };
  }

  const username = await generateUsername(input.name || email.split("@")[0]);
  const user: AccountUser = {
    username,
    fullName: (input.name ?? "").trim(),
    email,
    points: 0,
    todayEarned: 0,
    lifetimeEarned: 0,
    refCode: genRefCode(),
    invitedBy: input.ref?.trim() || undefined,
    createdAt: Date.now(),
  };

  await writeJSON(emailToPath(email), {
    email,
    username,
    provider: "google",
    emailVerified: true,
    ip: input.ip || "",
    banned: false,
    user,
    withdrawals: [],
  });

  return { ok: true, user, email, created: true };
}

export async function adminUpdateUser(
  email: string,
  action: AdminUserAction,
  value?: string | number
): Promise<{ ok: boolean; error?: string }> {
  const acc = await readAccountRaw(email);
  if (!acc) return { ok: false, error: "Account not found." };
  acc.user = acc.user || ({} as AccountUser);

  switch (action) {
    case "setPoints":
      acc.user.points = Math.max(0, Math.floor(Number(value) || 0));
      break;
    case "addPoints":
      acc.user.points = Math.max(
        0,
        Math.floor((Number(acc.user.points) || 0) + (Number(value) || 0))
      );
      break;
    case "setPassword": {
      const pw = String(value ?? "");
      if (pw.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
      acc.password = hashPassword(pw);
      break;
    }
    case "ban":
      acc.banned = true;
      break;
    case "unban":
      acc.banned = false;
      break;
    default:
      return { ok: false, error: "Invalid action." };
  }

  await writeJSON(emailToPath(acc.email), acc);
  return { ok: true };
}

// ---- Proofs ----

export async function getProofs(): Promise<Proof[]> {
  const p = await readJSON<Proof[]>(PROOFS_PATH, []);
  return Array.isArray(p) ? p : [];
}

export async function setProofs(proofs: Proof[]): Promise<void> {
  await writeJSON(PROOFS_PATH, proofs);
}

export async function getProofById(id: string): Promise<Proof | undefined> {
  const all = await getProofs();
  return all.find((p) => p.id === id);
}

export async function addProof(proof: Proof): Promise<void> {
  const all = await getProofs();
  const filtered = all.filter(
    (p) => !(p.email === proof.email && p.taskId === proof.taskId)
  );
  filtered.unshift(proof);
  await setProofs(filtered);
}

export async function deleteProof(proofId: string): Promise<boolean> {
  const all = await getProofs();
  const next = all.filter((p) => p.id !== proofId);
  if (next.length === all.length) return false;
  await setProofs(next);
  return true;
}

export async function reviewProof(
  proofId: string,
  status: ProofStatus,
  note?: string
): Promise<{ ok: boolean; awarded?: boolean }> {
  const all = await getProofs();
  const idx = all.findIndex((p) => p.id === proofId);
  if (idx < 0) return { ok: false };

  const proof = all[idx];
  proof.status = status;
  proof.note = note?.trim() || undefined;
  proof.reviewedAt = Date.now();

  let awarded = false;
  if (status === "approved" && !proof.awarded) {
    proof.awarded = true;
    awarded = true;
    const acc = await getAccount(proof.email);
    if (acc?.user) {
      const u = { ...acc.user };
      u.points = (u.points ?? 0) + proof.points;
      u.todayEarned = (u.todayEarned ?? 0) + proof.points;
      u.lifetimeEarned = (u.lifetimeEarned ?? 0) + proof.points;
      await upsertAccount(proof.email, {
        user: u,
        withdrawals: acc.withdrawals ?? [],
      });
      await creditReferralCommission(proof.email, proof.points);
    }
  }

  all[idx] = proof;
  await setProofs(all);
  return { ok: true, awarded };
}

// ---- Service orders ----

export async function getServiceOrders(): Promise<ServiceOrder[]> {
  const o = await readJSON<ServiceOrder[]>(SERVICE_ORDERS_PATH, []);
  return Array.isArray(o) ? o : [];
}

export async function getServiceOrderById(id: string): Promise<ServiceOrder | undefined> {
  const all = await getServiceOrders();
  return all.find((o) => o.id === id);
}

export async function addServiceOrder(order: ServiceOrder): Promise<void> {
  const all = await getServiceOrders();
  all.unshift(order);
  await writeJSON(SERVICE_ORDERS_PATH, all);
}

export async function updateServiceOrder(
  id: string,
  patch: Partial<ServiceOrder>
): Promise<{ ok: boolean; error?: string }> {
  const all = await getServiceOrders();
  const idx = all.findIndex((o) => o.id === id);
  if (idx < 0) return { ok: false, error: "Order not found." };
  all[idx] = { ...all[idx], ...patch, id: all[idx].id };
  await writeJSON(SERVICE_ORDERS_PATH, all);
  return { ok: true };
}

export async function deleteServiceOrder(id: string): Promise<boolean> {
  const all = await getServiceOrders();
  const next = all.filter((o) => o.id !== id);
  if (next.length === all.length) return false;
  await writeJSON(SERVICE_ORDERS_PATH, next);
  return true;
}

// ---- Withdrawals ----

export async function getWithdrawals(): Promise<Withdrawal[]> {
  const w = await readJSON<Withdrawal[]>(WITHDRAWALS_PATH, []);
  return Array.isArray(w) ? w : [];
}

export async function getWithdrawalById(id: string): Promise<Withdrawal | undefined> {
  const all = await getWithdrawals();
  return all.find((w) => w.id === id);
}

export async function addWithdrawal(withdrawal: Withdrawal): Promise<void> {
  const all = await getWithdrawals();
  all.unshift(withdrawal);
  await writeJSON(WITHDRAWALS_PATH, all);

  const acc = await readAccountRaw(withdrawal.email);
  if (acc) {
    acc.withdrawals = [withdrawal, ...(acc.withdrawals ?? [])];
    await writeJSON(emailToPath(withdrawal.email), acc);
  }
}

export async function updateWithdrawal(
  id: string,
  patch: Partial<Withdrawal>
): Promise<{ ok: boolean; error?: string; refunded?: boolean }> {
  const all = await getWithdrawals();
  const idx = all.findIndex((w) => w.id === id);
  if (idx < 0) return { ok: false, error: "Withdrawal not found." };

  const prev = all[idx];
  const next = { ...prev, ...patch, id: prev.id };
  all[idx] = next;
  await writeJSON(WITHDRAWALS_PATH, all);

  const acc = await readAccountRaw(next.email);
  if (acc) {
    acc.withdrawals = (acc.withdrawals ?? []).map((w) =>
      w.id === id ? { ...w, ...next } : w
    );

    let refunded = false;
    if (prev.status === "pending" && next.status === "rejected") {
      if (acc.user) {
        acc.user.points = (acc.user.points ?? 0) + prev.amountPoints;
        refunded = true;
      }
    }

    await writeJSON(emailToPath(next.email), acc);
    return { ok: true, refunded };
  }

  return { ok: true };
}

export async function deleteWithdrawal(id: string): Promise<boolean> {
  const all = await getWithdrawals();
  const item = all.find((w) => w.id === id);
  const next = all.filter((w) => w.id !== id);
  if (!item || next.length === all.length) return false;
  await writeJSON(WITHDRAWALS_PATH, next);

  const acc = await readAccountRaw(item.email);
  if (acc) {
    acc.withdrawals = (acc.withdrawals ?? []).filter((w) => w.id !== id);
    await writeJSON(emailToPath(item.email), acc);
  }
  return true;
}
