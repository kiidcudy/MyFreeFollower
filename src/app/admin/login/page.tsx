"use client";

import { useRouter } from "next/navigation";
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800 p-8 shadow-xl"
      >
        <h1 className="font-display text-xl font-bold text-white">Admin Login</h1>
        <p className="mt-1 text-sm text-slate-400">MyFreeFollower control panel</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-500/20 px-3 py-2 text-sm text-red-300">{error}</p>
        )}

        <label className="mt-6 block text-sm font-medium text-slate-300">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2.5 text-white outline-none focus:border-teal-500"
            autoComplete="current-password"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-lg bg-teal-600 py-2.5 text-sm font-semibold text-white hover:bg-teal-500 disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Enter admin"}
        </button>
      </form>
    </div>
  );
}
