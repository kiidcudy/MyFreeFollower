"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { findTask as findTaskInList, legacyDemoTaskIds, type Task } from "@/lib/tasks/data";
import { effectivePoints, siteConfig } from "@/lib/site";

export type ProofStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "needs_edit"
  | "recheck";

export interface ProofSubmission {
  id: string;
  taskId: string;
  taskTitle: string;
  platform: string;
  type?: string;
  points: number;
  status: ProofStatus;
  note?: string;
  accountName?: string;
  mediaType?: "image" | "video";
  media?: string;
  createdAt: number;
  reviewedAt?: number;
  awarded?: boolean;
}

export interface Withdrawal {
  id: string;
  method: "PayPal" | "Crypto" | "Bank Transfer" | "Gift Card";
  amountPoints: number;
  amountMoney: number;
  /** @deprecated legacy alias */
  amountUSD?: number;
  destination: string;
  status: "pending" | "approved" | "rejected";
  createdAt: number;
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
  paymentMethod?: "card" | "crypto" | "points";
  paymentStatus?: "pending" | "paid" | "failed";
  chargeUSD?: number;
  chargeEUR?: number;
  createdAt: number;
}

export interface User {
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

interface AccountData {
  password: string;
  user: User;
  proofs: ProofSubmission[];
  withdrawals: Withdrawal[];
  serviceOrders?: ServiceOrder[];
}

type Accounts = Record<string, AccountData>;

interface SessionState {
  user: User | null;
  proofs: ProofSubmission[];
  withdrawals: Withdrawal[];
  serviceOrders: ServiceOrder[];
  tasks: Task[];
}

interface AuthContextValue extends SessionState {
  ready: boolean;
  referralCode: string;
  register: (data: {
    username: string;
    fullName: string;
    email: string;
    password: string;
    ref?: string;
  }) => Promise<{ ok: boolean; error?: string }>;
  login: (identifier: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginWithGoogle: (
    credential: string,
    ref?: string
  ) => Promise<{ ok: boolean; error?: string; created?: boolean }>;
  logout: () => void;
  submitProof: (
    taskId: string,
    data: { media: string; mediaType: "image" | "video"; accountName: string }
  ) => Promise<{ ok: boolean; error?: string }>;
  resubmitProof: (
    proofId: string,
    data: { media: string; mediaType: "image" | "video"; accountName: string }
  ) => Promise<{ ok: boolean; error?: string }>;
  claimDailyBonus: () => { ok: boolean; error?: string; points?: number };
  reward: (points: number) => { ok: boolean; error?: string };
  spendPoints: (
    o: Omit<ServiceOrder, "id" | "status" | "createdAt">
  ) => Promise<{ ok: boolean; error?: string; order?: ServiceOrder }>;
  refreshTasks: () => Promise<void>;
  updateProfile: (data: { fullName?: string }) => { ok: boolean; error?: string };
}

const ACCOUNTS_KEY = "mff-accounts-v1";
const SESSION_KEY = "mff-session-v1";
const TASKS_CACHE_KEY = "mff-shared-tasks-cache-v3";

const AuthContext = createContext<AuthContextValue | null>(null);

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function genId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`;
}

function genRefCode() {
  return Math.floor(10000000 + Math.random() * 89999999).toString();
}

function readAccounts(): Accounts {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as Accounts) : {};
  } catch {
    return {};
  }
}

function writeAccounts(a: Accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(a));
}

function stripLegacyTasks(tasks: Task[]): Task[] {
  return tasks.filter((t) => !legacyDemoTaskIds.has(String(t.id)));
}

function readCachedTasks(): Task[] {
  try {
    const raw = localStorage.getItem(TASKS_CACHE_KEY);
    return raw ? stripLegacyTasks(JSON.parse(raw) as Task[]) : [];
  } catch {
    return [];
  }
}

function normalizeToday(user: User): User {
  if (user.todayEarnedDate !== todayStr()) {
    return { ...user, todayEarned: 0, todayEarnedDate: todayStr() };
  }
  return user;
}

function findTask(id: string, tasks: Task[]): Task | undefined {
  return findTaskInList(id, tasks) ?? findTaskInList(id, readCachedTasks());
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SessionState>({
    user: null,
    proofs: [],
    withdrawals: [],
    serviceOrders: [],
    tasks: [],
  });
  const [ready, setReady] = useState(false);
  const emailRef = useRef<string | null>(null);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  const refreshTasks = useCallback(async () => {
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      const data = (await res.json()) as { tasks?: Task[]; kv?: boolean };
      const tasks = data.tasks ?? [];
      if (data.kv && typeof window !== "undefined") {
        localStorage.setItem(TASKS_CACHE_KEY, JSON.stringify(tasks));
      }
      setSession((prev) => ({ ...prev, tasks }));
    } catch {
      setSession((prev) => ({ ...prev, tasks: readCachedTasks() }));
    }
  }, []);

  const refreshFromServer = useCallback(async (email: string) => {
    try {
      const enc = encodeURIComponent(email);
      const [accRes, prRes] = await Promise.all([
        fetch(`/api/accounts?email=${enc}`, { cache: "no-store" }),
        fetch(`/api/proofs?email=${enc}`, { cache: "no-store" }),
      ]);
      const accData = (await accRes.json()) as {
        account?: {
          user?: Partial<User>;
          banned?: boolean;
          withdrawals?: Withdrawal[];
        } | null;
        kv?: boolean;
      };
      const prData = (await prRes.json()) as { proofs?: ProofSubmission[]; kv?: boolean };

      if (accData?.account?.banned) {
        localStorage.removeItem(SESSION_KEY);
        emailRef.current = null;
        setSession((prev) => ({
          ...prev,
          user: null,
          proofs: [],
          withdrawals: [],
          serviceOrders: [],
        }));
        return;
      }

      setSession((prev) => {
        if (!prev.user) return prev;
        const su = accData?.account?.user;
        const proofs = Array.isArray(prData?.proofs) ? prData.proofs : prev.proofs;
        const withdrawals = Array.isArray(accData?.account?.withdrawals)
          ? accData.account!.withdrawals!
          : prev.withdrawals;
        return {
          ...prev,
          user: su
            ? {
                ...prev.user,
                points: typeof su.points === "number" ? su.points : prev.user.points,
                todayEarned:
                  typeof su.todayEarned === "number" ? su.todayEarned : prev.user.todayEarned,
              }
            : prev.user,
          proofs,
          withdrawals,
        };
      });
    } catch {
      /* continue with local data */
    }
  }, []);

  useEffect(() => {
    const accounts = readAccounts();
    const email = localStorage.getItem(SESSION_KEY);
    if (email && accounts[email]) {
      emailRef.current = email;
      const acc = accounts[email];
      const user = normalizeToday(acc.user);
      setSession({
        user,
        proofs: acc.proofs ?? [],
        withdrawals: acc.withdrawals ?? [],
        serviceOrders: acc.serviceOrders ?? [],
        tasks: readCachedTasks(),
      });
      refreshFromServer(email);
    }
    // Task list is only rendered by the dashboard's TaskRunner, which fetches it
    // on its own mount — pulling it here cost every marketing page an API call
    // during hydration.
    setReady(true);
  }, [refreshFromServer]);

  useEffect(() => {
    if (!ready) return;
    const email = emailRef.current;
    if (!email || !session.user) return;
    const accounts = readAccounts();
    const prev = accounts[email];
    if (!prev) return;

    const lightProofs = session.proofs.map(({ media, ...rest }) => rest);
    accounts[email] = {
      ...prev,
      user: session.user,
      proofs: lightProofs,
      withdrawals: session.withdrawals,
      serviceOrders: session.serviceOrders,
    };
    writeAccounts(accounts);

    fetch("/api/accounts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email,
        data: {
          user: session.user,
        },
      }),
      keepalive: true,
    }).catch(() => {});
  }, [session, ready]);

  const activateSession = useCallback((email: string, password: string, user: User) => {
    const accounts = readAccounts();
    accounts[email] = {
      password,
      user,
      proofs: accounts[email]?.proofs ?? [],
      withdrawals: accounts[email]?.withdrawals ?? [],
      serviceOrders: accounts[email]?.serviceOrders ?? [],
    };
    writeAccounts(accounts);
    localStorage.setItem(SESSION_KEY, email);
    emailRef.current = email;
    setSession({
      user: normalizeToday(user),
      proofs: accounts[email]?.proofs ?? [],
      withdrawals: accounts[email]?.withdrawals ?? [],
      serviceOrders: accounts[email]?.serviceOrders ?? [],
      tasks: readCachedTasks(),
    });
  }, []);

  const register: AuthContextValue["register"] = useCallback(
    async (data) => {
      const username = data.username.trim();
      const fullName = data.fullName.trim();
      const email = data.email.trim().toLowerCase();
      if (!username || !fullName || !email || !data.password) {
        return { ok: false, error: "Please fill in all fields." };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, error: "Enter a valid email address." };
      }
      if (data.password.length < 6) {
        return { ok: false, error: "Password must be at least 6 characters." };
      }

      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username,
            fullName,
            email,
            password: data.password,
            ref: data.ref,
          }),
        });
        if (res.status !== 503) {
          const out = (await res.json()) as { ok: boolean; user?: User; error?: string };
          if (!out.ok) return { ok: false, error: out.error ?? "Registration failed." };
          activateSession(email, data.password, out.user as User);
          return { ok: true };
        }
      } catch {
        /* local fallback */
      }

      const accounts = readAccounts();
      if (accounts[email]) {
        return { ok: false, error: "An account with this email exists. Try signing in." };
      }
      const user: User = {
        username,
        fullName,
        email,
        points: 0,
        todayEarned: 0,
        todayEarnedDate: todayStr(),
        lifetimeEarned: 0,
        refCode: genRefCode(),
        invitedBy: data.ref?.trim() || undefined,
        createdAt: Date.now(),
      };
      activateSession(email, data.password, user);
      return { ok: true };
    },
    [activateSession]
  );

  const login: AuthContextValue["login"] = useCallback(
    async (rawIdentifier, password) => {
      const identifier = rawIdentifier.trim();
      if (!identifier || !password) {
        return { ok: false, error: "Email/username and password are required." };
      }

      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ identifier, password }),
        });
        if (res.status !== 503) {
          const out = (await res.json()) as {
            ok: boolean;
            user?: User;
            email?: string;
            banned?: boolean;
            reason?: string;
          };
          if (out.ok && out.user && out.email) {
            activateSession(out.email, password, out.user);
            refreshFromServer(out.email);
            return { ok: true };
          }
          if (out.banned) {
            return { ok: false, error: "Your account is suspended. Contact support." };
          }
        }
      } catch {
        /* local fallback */
      }

      const email = identifier.toLowerCase();
      const accounts = readAccounts();
      const acc =
        accounts[email] ??
        Object.values(accounts).find(
          (a) => a.user.username.toLowerCase() === identifier.toLowerCase()
        );
      if (!acc) return { ok: false, error: "Account not found. Check your credentials." };
      if (acc.password !== password) {
        return { ok: false, error: "Incorrect password. Please try again." };
      }

      const user = normalizeToday(acc.user);
      activateSession(user.email, password, user);
      refreshFromServer(user.email);
      return { ok: true };
    },
    [activateSession, refreshFromServer]
  );

  const loginWithGoogle: AuthContextValue["loginWithGoogle"] = useCallback(
    async (credential, ref) => {
      try {
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ credential, ref }),
        });
        const out = (await res.json()) as {
          ok: boolean;
          user?: User;
          email?: string;
          created?: boolean;
          banned?: boolean;
          error?: string;
        };
        if (out.ok && out.user && out.email) {
          activateSession(out.email, "", out.user);
          refreshFromServer(out.email);
          return { ok: true, created: out.created };
        }
        if (out.banned) {
          return { ok: false, error: "Your account is suspended. Contact support." };
        }
        return { ok: false, error: out.error ?? "Google sign-in failed." };
      } catch {
        return { ok: false, error: "Connection error. Try again." };
      }
    },
    [activateSession, refreshFromServer]
  );

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    emailRef.current = null;
    setSession({
      user: null,
      proofs: [],
      withdrawals: [],
      serviceOrders: [],
      tasks: readCachedTasks(),
    });
  }, []);

  const submitProof: AuthContextValue["submitProof"] = useCallback(
    async (taskId, { media, mediaType, accountName }) => {
      const current = sessionRef.current;
      const task = findTask(taskId, current.tasks);
      if (!task) return { ok: false, error: "Task not found." };
      if (!current.user) return { ok: false, error: "You must be signed in." };

      const existing = current.proofs.find((p) => p.taskId === taskId);
      if (existing) {
        if (existing.status === "needs_edit") {
          return {
            ok: false,
            error: "Admin requested edits. Resubmit from your Proofs page.",
          };
        }
        return {
          ok: false,
          error:
            existing.status === "approved"
              ? "You have already completed this task."
              : "You have already submitted proof for this task.",
        };
      }

      const award = effectivePoints(task.basePoints);
      const proof: ProofSubmission = {
        id: genId("proof"),
        taskId: task.id,
        taskTitle: task.title,
        platform: task.platform,
        type: task.type,
        points: award,
        status: "pending",
        accountName: accountName?.trim(),
        mediaType,
        media,
        createdAt: Date.now(),
      };

      try {
        const res = await fetch("/api/proofs", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            ...proof,
            email: current.user.email,
            username: current.user.username,
          }),
        });
        if (!res.ok) {
          const data = (await res.json().catch(() => null)) as { error?: string } | null;
          if (res.status === 409) {
            return { ok: false, error: data?.error ?? "You have already submitted proof for this task." };
          }
          if (res.status !== 503) {
            return { ok: false, error: data?.error ?? "Could not submit proof. Try again." };
          }
        }
      } catch {
        return { ok: false, error: "Connection error. Try again." };
      }

      setSession((prev) => ({
        ...prev,
        proofs: [proof, ...prev.proofs.filter((p) => p.taskId !== taskId)],
      }));

      return { ok: true };
    },
    []
  );

  const resubmitProof: AuthContextValue["resubmitProof"] = useCallback(async (proofId, data) => {
    const current = sessionRef.current;
    if (!current.user) return { ok: false, error: "You must be signed in." };

    const existing = current.proofs.find((p) => p.id === proofId);
    if (!existing) return { ok: false, error: "Proof not found." };
    if (existing.status !== "needs_edit") {
      return { ok: false, error: "This proof cannot be edited." };
    }

    try {
      const res = await fetch("/api/proofs", {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          proofId,
          email: current.user.email,
          media: data.media,
          mediaType: data.mediaType,
          accountName: data.accountName,
        }),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => null)) as { error?: string } | null;
        return { ok: false, error: err?.error ?? "Could not resubmit proof. Try again." };
      }
      const payload = (await res.json()) as { proof?: ProofSubmission };
      const updated = payload.proof ?? {
        ...existing,
        ...data,
        accountName: data.accountName?.trim(),
        status: "pending" as const,
        note: undefined,
        reviewedAt: undefined,
        createdAt: Date.now(),
      };

      setSession((prev) => ({
        ...prev,
        proofs: prev.proofs.map((p) => (p.id === proofId ? { ...p, ...updated } : p)),
      }));
      return { ok: true };
    } catch {
      return { ok: false, error: "Connection error. Try again." };
    }
  }, []);

  const claimDailyBonus: AuthContextValue["claimDailyBonus"] = useCallback(() => {
    const bonus = siteConfig.dailyBonusPoints;
    let result: { ok: boolean; error?: string; points?: number } = { ok: true, points: bonus };
    setSession((prev) => {
      if (!prev.user) {
        result = { ok: false, error: "You must be signed in." };
        return prev;
      }
      const user = normalizeToday(prev.user);
      if (user.lastBonusClaim === todayStr()) {
        result = { ok: false, error: "You already claimed today's bonus." };
        return { ...prev, user };
      }
      return {
        ...prev,
        user: {
          ...user,
          points: user.points + bonus,
          todayEarned: user.todayEarned + bonus,
          lifetimeEarned: (user.lifetimeEarned ?? 0) + bonus,
          lastBonusClaim: todayStr(),
        },
      };
    });
    return result;
  }, []);

  const reward: AuthContextValue["reward"] = useCallback((points) => {
    let result: { ok: boolean; error?: string } = { ok: true };
    setSession((prev) => {
      if (!prev.user) {
        result = { ok: false, error: "You must be signed in." };
        return prev;
      }
      const user = normalizeToday(prev.user);
      return {
        ...prev,
        user: {
          ...user,
          points: user.points + points,
          todayEarned: user.todayEarned + points,
          lifetimeEarned: (user.lifetimeEarned ?? 0) + points,
        },
      };
    });
    return result;
  }, []);

  const spendPoints: AuthContextValue["spendPoints"] = useCallback(async (o) => {
    const current = sessionRef.current;
    if (!current.user) return { ok: false, error: "You must be signed in." };
    if (o.points > 0 && o.points > current.user.points) {
      return { ok: false, error: "Not enough points. Complete tasks to earn points." };
    }

    const order: ServiceOrder = {
      ...o,
      id: genId("svc"),
      status: "pending",
      createdAt: Date.now(),
    };

    setSession((prev) => ({
      ...prev,
      serviceOrders: [order, ...prev.serviceOrders],
      user:
        o.points > 0 && prev.user
          ? { ...prev.user, points: prev.user.points - o.points }
          : prev.user,
    }));

    try {
      await fetch("/api/service-orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...order,
          email: current.user.email,
          memberUsername: current.user.username,
        }),
      });
    } catch {
      /* local state updated */
    }

    return { ok: true, order };
  }, []);

  const updateProfile: AuthContextValue["updateProfile"] = useCallback((data) => {
    let result: { ok: boolean; error?: string } = { ok: true };
    setSession((prev) => {
      if (!prev.user) {
        result = { ok: false, error: "You must be signed in." };
        return prev;
      }
      const fullName = data.fullName?.trim();
      return {
        ...prev,
        user: {
          ...prev.user,
          ...(fullName !== undefined ? { fullName: fullName || prev.user.fullName } : {}),
        },
      };
    });
    return result;
  }, []);

  const referralCode = session.user?.refCode ?? "";

  const value = useMemo<AuthContextValue>(
    () => ({
      ...session,
      ready,
      referralCode,
      register,
      login,
      loginWithGoogle,
      logout,
      submitProof,
      resubmitProof,
      claimDailyBonus,
      reward,
      spendPoints,
      refreshTasks,
      updateProfile,
    }),
    [
      session,
      ready,
      referralCode,
      register,
      login,
      loginWithGoogle,
      logout,
      submitProof,
      resubmitProof,
      claimDailyBonus,
      reward,
      spendPoints,
      refreshTasks,
      updateProfile,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
