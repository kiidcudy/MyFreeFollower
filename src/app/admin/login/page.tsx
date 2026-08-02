"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { adminLogin } from "@/lib/admin-store";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = await adminLogin(password);
    setLoading(false);
    if (ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Invalid admin password.");
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="mb-1 text-2xl font-black text-slate-900">🔐 Admin Panel</div>
        <p className="mb-6 text-sm text-slate-500">Enter admin password to continue.</p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin password"
          className="mb-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-accent-500 focus:ring-2 focus:ring-accent-200"
          required
        />
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Signing in…" : "Sign in"}
        </button>
        <Link href="/en" className="mt-4 block text-center text-xs text-slate-400 hover:text-accent-600">
          ← Back to site
        </Link>
      </form>
    </div>
  );
}
